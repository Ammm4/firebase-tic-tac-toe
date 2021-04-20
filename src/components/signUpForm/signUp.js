import React, {useState} from 'react';
import './signUp.css';


function SignUpForm({showSignInForm, signUp, error}){
 const [signUpDetails, setSignUpDetails] = useState({username:"", email:"", password:"", password1:""})
 const handleClick = (event) => {
     event.preventDefault();
     showSignInForm();
 }
 const handleSubmit = (event) => {
       event.preventDefault();
       if(signUpDetails.password === signUpDetails.password1){
            signUp(signUpDetails.email,signUpDetails.password)
       }
       
 }
  return (
    <div className="signInPage">
      <h1>tIc-tAc-tOe</h1>
      <form onSubmit={handleSubmit}>
            <div className="form-heading">
                <h2>Sign Up</h2>
            </div>
            <div className="form-inputs">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" onChange={e => setSignUpDetails({...signUpDetails, username: e.target.value})} value={setSignUpDetails.username}/>              
            </div>
            <div className="form-inputs">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" onChange={e => setSignUpDetails({...signUpDetails, email: e.target.value})} value={setSignUpDetails.email}/>              
            </div> 
            <div className="form-inputs">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={e => setSignUpDetails({...signUpDetails, password: e.target.value})} value={setSignUpDetails.password}/>
            </div> 
            <div className="form-inputs">
                <label htmlFor="password1">Confirm Password:</label>
                <input type="password" name="password1" id="password1" onChange={e => setSignUpDetails({...signUpDetails, password1: e.target.value})} value={setSignUpDetails.password1}/>
            </div>
            <input type="submit" value="Sign Up"/>
            <p>Already have an account? <a href="#" onClick={handleClick}>Sign in</a></p>
            <p className="error">{error}</p> 
      </form>
      
    </div>
  )
}

export default SignUpForm;

