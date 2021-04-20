import {React, useState, useEffect} from 'react';
import SignInForm from './components/signInForm/signIn';
import SignUpForm from './components/signUpForm/signUp';
import Homepage from './components/homepage/homepage';
import database from './firebase/config';
import './App.css';


function App() {
  const [users, setUsers] = useState(null);

  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [logIn, setLogIn] = useState(true);
  const [signUp, setSignUp] = useState(false);

  const [user, setUser] = useState(null);

  const [error, setError] = useState("");
  
  useEffect( () => {
    let arr = [];
    let ref = database.ref("users");
    ref.once('value', (snapshot) => {
           snapshot.forEach(function(childSnapshot){
                 arr.push(childSnapshot.val())
           })
         })
       setUsers(arr);
    }, []);

 const showSignUpForm = () => {
    setLogIn(false);
    setSignUp(true);
 }
 const showSignInForm = () => {
  setSignUp(false);
  setLogIn(true);
}
  const signIn = (logInDetails) => {
    users.forEach(user => {
         if (logInDetails.email === user.email && logInDetails.password === user.password){         
           setisLoggedIn(true);
           setUser(user); 
           setError("");
         }    
    })
    if (!isLoggedIn) setError("Invalid email or password!")
  }

  const signOut = () => {
   setUser(null);
   setError("")
  }

  return (
    <div className="app-wrap">
      {logIn && <SignInForm signIn={signIn} error={error} showSignUpForm={showSignUpForm}/>}
      {signUp && <SignUpForm showSignInForm={showSignInForm} />}
      {isLoggedIn && <Homepage signOut={signOut} user={user} />}
      {/* {(user)? <Homepage signOut={signOut} user={user} /> : <SignInForm signIn={signIn} error={error}/>} */}
    </div>
  );
}

export default App;
