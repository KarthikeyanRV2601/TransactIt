import React, { useState } from 'react';
import '../components/styles/signup.css';
import {useAuth} from '../contexts/AuthContext';
const Signup=()=>{

const {signup}=useAuth();
const [email,setemail]=useState();
const [password,setpassword]=useState();
const [cnfpassword,setcnfpassword]=useState();
const [loading,setLoading]=useState(false);
const handleSubmit=async (e)=>{
    e.preventDefault();
    if(password && (password===cnfpassword))
    {
        setLoading(true)
        try{
            await signup(email,password);
            alert("firebase signup success");
        }
        catch(err){
            console.error({err})
        }
        setLoading(false)
    }
    else{
        console.error("passwords doesn't match")
    }
}


return(
    
    !loading&&<body>
        <form className="signupForm" action="" onSubmit={e=>handleSubmit(e)}>
            <h2>Sign up</h2>
            <input type="text" name="" id="email" placeholder="email"
            onChange={e=>{
                setemail(e.target.value)
            }}/>
            <input type="password" name="" id="password" placeholder="password"
             onChange={e=>{
                setpassword(e.target.value)
            }}/>
            <input type="password" name="" id="cnfpassword" placeholder="confirm password"
            onChange={e=>{
                setcnfpassword(e.target.value)
            }}
            />
            <button type="submit">sign up</button>
        </form>
        <div className="signinLink">
            already have an account?<a href="/signin">sign in</a>
        </div>
    </body>
)
}
export default Signup;