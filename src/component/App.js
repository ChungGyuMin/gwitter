import React, { useEffect, useState } from "react";
import AppRouter from "component/Router";
import {authService} from "fbase";
function App() {
  const [init,setInit] = useState(false);
  const [isLoggedIn,setIsLoggerIn] = useState(authService.currentUser);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggerIn(true);
      }else{
        setIsLoggerIn(false);
      }
      setInit(true);
    });
  },[]);
  return <>
  {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing...."}
  <footer>&copy;{new Date().getFullYear()} Gwitter</footer>
  </>
}

export default App;
