import React, { useState } from 'react';
import Img1 from '../images/user.png';
import '../sign-in-up.css';
import { Link, useHistory } from 'react-router-dom';

function SignInForm({ handleLogin }){
  const [signInDetails, setSignInDetails] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        setError("");
        await handleLogin(signInDetails.email, signInDetails.password);
        history.push('/'); 
      } catch (error) { 
        switch(error.code) {
          case "auth/invalid-email": 
            setError('Wrong Email');
            break;
          case "auth/user-disabled":
            setError('User Disabled'); 
            break;
          case "auth/user-not-found":
            setError('User not found');
            break;
          case "auth/wrong-password":        
            setError('Wrong Password');
            break;
          default:
            setError('Something went wrong!');                 
         }
      };
 }
  return (
    <div className="signInPage">
      <h1>tIc-tAc-tOe</h1>
      <form onSubmit={ handleSubmit }>
        <div className="form-heading">
          <h2>Log In</h2>
        </div>
        <img src={ Img1 } alt="LogIn Avatar" className="log-in-avatar"/>
        <div className="form-inputs">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" onChange={ e => setSignInDetails({ ...signInDetails, email: e.target.value }) } value={ setSignInDetails.email }/>              
        </div> 
        <div className="form-inputs">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={ e => setSignInDetails({ ...signInDetails, password: e.target.value }) } value={ setSignInDetails.password }/>
        </div>           
        <input type="submit" value="Sign In"/>
        <p>Don't have an account?<br/> <Link to="/signup">Sign up</Link></p>
        <p className="signin-error">{ error }</p> 
      </form>
      <h5 className="bottom-line">Project Dedicated to Suraj Neupane.</h5>
    </div>
  )
}

export default SignInForm;