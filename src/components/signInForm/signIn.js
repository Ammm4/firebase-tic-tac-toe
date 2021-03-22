import React, {useState} from 'react';
import './signIn.css';


function SignInForm({signIn, error}){
 const [signInDetails, setSignInDetails] = useState({email:"", password:""})

 const handleSubmit = (event) => {
       event.preventDefault();
       signIn(signInDetails)
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
            <p>Don't have an account? <a href="#">Sign Up</a></p>  
            <p className="error">{error}</p> 
      </form>
      
    </div>
  )
}

export default SignInForm;