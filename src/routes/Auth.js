import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [newAccount,setNewAccount] = useState(true);
    const onChange =(event) =>{
        const {target: {name,value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async (event) =>{
        event.preventDefault();
        try{
            let data ;    
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(
                    email,password
                    );
            }else{
                data = await authService.signInWithEmailAndPassword(
                    email,password
                    );    
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }

    };
    const toggleAccount =() => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) =>{
        console.log(event.target.name);
        const {
            target: {name},
        } =event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider);
    };
    return (
    <div>
    <form name = "sForm" onSubmit={onSubmit}>
        <input type="text" name = "email" placeholder="Email" required value={email} onChange={onChange}/>
        <input type="password" name = "password" placeholder="Password" required value={password} onChange={onChange}/>
        <input type="submit" name = "sButton" value={newAccount ? "Create Account" : "Sign In"} />
    </form>
    <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>

    </div>
    {error}
    <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
</div>
    );
}
export default Auth ;