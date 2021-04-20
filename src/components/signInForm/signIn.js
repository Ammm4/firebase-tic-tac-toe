import React, {useState} from 'react';
import './signIn.css';


function SignInForm({signIn, error, showSignUpForm}){
 const [signInDetails, setSignInDetails] = useState({email:"", password:""})

 const handleSubmit = (event) => {
       event.preventDefault();
       signIn(signInDetails)
 }
 const handleClick = (e) => {
   e.preventDefault();
   showSignUpForm();
 }
  return (
    <div className="signInPage">
      <h1>tIc-tAc-tOe</h1>
      <form onSubmit={handleSubmit}>
            <div className="form-heading">
                <h2>Log In</h2>
            </div>
            <div className="form-inputs">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" onChange={e => setSignInDetails({...signInDetails, email: e.target.value})} value={setSignInDetails.email}/>              
            </div> 
            <div className="form-inputs">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={e => setSignInDetails({...signInDetails, password: e.target.value})} value={setSignInDetails.password}/>
            </div> 
            
            <input type="submit" value="Sign In"/>
            <p>Don't have an account?<br/> <a href="#" onClick={handleClick}>Sign up</a></p>  
            <p className="error">{error}</p> 
      </form>
      <h5 className="bottom-line">Project Dedicated to Suraj Neupane.</h5>
    </div>
  )
}

export default SignInForm;