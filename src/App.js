import {React, useState} from 'react';
import SignInForm from './components/signIn';
import SignUpForm from './components/signUp';
import Homepage from './components/homepage/homepage';
import {database, firebaseAuth} from './firebase/config';
import './App.css';

console.log(process.env.REACT_APP_FIREBASE_DATABASE_URL);
function App() {
  
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [logIn, setLogIn] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [user, setUser] = useState(null);

 const showSignUpForm = () => {
    setLogIn(false);
    setSignUp(true);
 }
 const showSignInForm = () => {
  setSignUp(false);
  setLogIn(true);
}

const showHomepage = (user) => {
  setUser(user);
  setLogIn(false);
  setisLoggedIn(true)
  
}

  const signOut = (user) => {
   database.ref(`onlineUsers/${user}`).remove();
   firebaseAuth.signOut();
   setisLoggedIn(false);
   setLogIn(true);
  }

  return (
    <div className="app-wrap">
      {logIn && <SignInForm showSignUpForm={showSignUpForm} showHomepage={showHomepage}/>}
      {signUp && <SignUpForm showSignInForm={showSignInForm} />}
      {isLoggedIn && <Homepage signOut={signOut} userId={user} />}
    </div>
  );
}

export default App;
