import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
    const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password,cpassword}=credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {

           method: 'POST', // *GET, POST, PUT, DELETE, etc.
           headers: {
             'Content-Type': 'application/json',
             // 'Content-Type': 'application/x-www-form-urlencoded',
             
       
           },
       body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
         });
         const json= await response.json();
         console.log(json);
         if (json.success) {
            localStorage.setItem('token',json.authtoken)
            navigate("/");            
         }
         else{

         }

         
        
       }
   
       const onChange=(e)=>{
           setCredentials({...credentials,[e.target.name]: e.target.value})
       }
  return (

    <div>
<form onSubmit={handleSubmit}>
<div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
