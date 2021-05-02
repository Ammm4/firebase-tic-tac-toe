import React, {useState} from 'react';
import {database, firebaseAuth} from '../firebase/config';
import Img1 from '../images/user.png';
import '../sign-in-up.css';


function SignInForm({showSignUpForm,showHomepage}){
 const [signInDetails, setSignInDetails] = useState({email:"", password:""});
 const [error, setError] = useState("")

 const handleSubmit = (event) => {
       event.preventDefault();
       firebaseAuth.signInWithEmailAndPassword(signInDetails.email, signInDetails.password)
       .then((userCredential) => {
         var user = userCredential.user; 
       })
       .catch((error) => {
         var errorCode = error.code;
         var errorMsg = error.message;
         console.log(errorMsg)
         setError(errorCode);
       });
       firebaseAuth.onAuthStateChanged(function(user) {
        if (user) {
          showHomepage(user.uid);
          database.ref('onlineUsers').update({[user.uid]:true})
        }
       });
      
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
            <img src={Img1} alt="LogIn Avatar" className="log-in-avatar"/>
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
            <p className="signin-error">{error}</p> 
      </form>
      <h5 className="bottom-line">Project Dedicated to Suraj Neupane.</h5>
    </div>
  )
}

export default SignInForm;