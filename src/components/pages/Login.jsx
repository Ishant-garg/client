import { useState } from 'react'
import React from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'
import axiosClient from '../../utils/axiosClient'
const Login = () => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    console.log(email)
    console.log(password)
 
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const result = await axiosClient.post('/auth/login' , {
                email, 
                password
            })
    
            console.log(result)
        }
        catch(error){
            console.log(error);
        }
     

    }
  return (
    <>
    <div className="login">
        <div className="login-box">
            <h2 className='login-heading'>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter email </label>
                <input type="email" className='email' id='email' onChange={(e) => setEmail(e.target.value)}  />

                <label htmlFor="password">Enter password</label>    
                <input type="password" name="password" id="password" className='password' onChange={(e) => setPassword(e.target.value)} />

                <input type="submit" value="SUBMIT" className='submit'/>
            </form>
            <p>Does Not have account ?  <Link to='/SignUp'>SignUp</Link> </p>
        </div>
    </div>
    </>
  )
}

export default Login