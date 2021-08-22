import React,{useState} from 'react';
import '../components/styles/signin.css';
import {useAuth} from '../contexts/AuthContext';
const Signin=()=>{
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    const [loading,setLoading]=useState(false);
    const {signin} =useAuth();
    const handleSignin=async (e)=>{
        e.preventDefault();
        if(password && email)
        {
            setLoading(true)
            try{
                await signin(email,password);
                localStorage.setItem('userEmail', email);
                window.location.href='/home';
                
            }
            catch(err){
                console.error({err})
            }
            setLoading(false)
        }
        else{
            console.error("credentials wrong")
        }
    }



return(
    !loading&&<>
    
        <form className="signinForm" action="" onSubmit={e=>handleSignin(e)}> 
            <h2>Sign in</h2>
            <input type="text" name="" id="email" placeholder="email"
             onChange={e=>{
                setemail(e.target.value)
            }}
            />
            <input type="password" name="" id="password" placeholder="password"
            onChange={e=>{
                setpassword(e.target.value)
            }}
            />
            <button type="submit" >sign in</button>
        </form>
        <div className="signupLink">
            new user?<a href="/signup">sign up</a>
        </div>
    </>
)
}
export default Signin;