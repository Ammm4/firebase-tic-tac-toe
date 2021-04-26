import React, {useState} from 'react';
import validate from '../validate';
import {database, firebaseAuth} from '../firebase/config';
import Img1 from '../images/oops.gif';
import '../sign-in-up.css';

const SignUpError = ({signUpError, closeSignUpError}) => {
    return(
        <div className="signup-error">
             <div>
             <img src={Img1} alt="oops" />
             <p>{signUpError}</p>
             <button onClick={() => closeSignUpError()}>Close</button>
             </div>
        </div>
    )
}
const writeUserData = (uId,username) => {
    database.ref(`users/${uId}`).set({
        username: username
    }).then(() => {
        firebaseAuth.signOut();
    })
}
function SignUpForm({showSignInForm}){
 const [signUpDetails, setSignUpDetails] = useState({username:"", email:"", password:"", password1:""});
 const [errors, setErrors] = useState({});
 const [signUpError, setSignUpError] = useState("");
 const handleClick = (event) => {
     event.preventDefault();
     showSignInForm();
 }
 const closeSignUpError = () => {
     setSignUpError("");
 }
 const handleSubmit = (event) => {
       event.preventDefault();
       let err = validate(signUpDetails);
       if(Object.keys(err).length !== 0){
        setErrors(err);
       } else {
        firebaseAuth.createUserWithEmailAndPassword(signUpDetails.email, signUpDetails.password)
        .then((userCredential) => {
                var user = userCredential.user;
                writeUserData(user.uid, signUpDetails.username);
                setSignUpDetails({...signUpDetails, username:"", email:"", password:"", password1:""})
        })
        .catch((error) => {
                var errorCode = error.code;
                setSignUpError(errorCode)
        });
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
                <input type="text" name="username" id="username" onChange={e => setSignUpDetails({...signUpDetails, username: e.target.value})} value={signUpDetails.username}/>              
            </div>
            {errors.username && <p className="error-msg">{errors.username}</p>}
            <div className="form-inputs">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" onChange={e => setSignUpDetails({...signUpDetails, email: e.target.value})} value={signUpDetails.email}/>              
            </div>
            {errors.email && <p className="error-msg">{errors.email}</p>}
            <div className="form-inputs">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={e => setSignUpDetails({...signUpDetails, password: e.target.value})} value={signUpDetails.password}/>
            </div>
            {errors.password && <p className="error-msg">{errors.password}</p>}
            <div className="form-inputs">
                <label htmlFor="password1">Confirm Password:</label>
                <input type="password" name="password1" id="password1" onChange={e => setSignUpDetails({...signUpDetails, password1: e.target.value})} value={signUpDetails.password1}/>
            </div>
            {errors.password1 && <p className="error-msg">{errors.password1}</p>}
            <input type="submit" value="Sign Up"/>
            <p>Already have an account? <a href="#" onClick={handleClick}>Sign in</a></p>
            {signUpError && <SignUpError signUpError={signUpError} closeSignUpError={closeSignUpError} />} 
      </form>
      
    </div>
  )
}

export default SignUpForm;

