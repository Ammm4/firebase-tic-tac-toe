import { React, useEffect, useState } from 'react';
import SignInForm from './components/signIn';
import SignUpForm from './components/signUp';
import Homepage from './components/homepage/homepage';
import { database, firebaseAuth } from './firebase/config';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogin = (email, password) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password);  
  }
  const handleSignup = (email, password) => {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);  
  }
 const signOut = (user) => {
   database.ref(`onlineUsers/${ user }`).remove();
   firebaseAuth.signOut();
 }
 useEffect(() => {
   const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      setUser(user.uid);
      setLoading(false);
      database.ref('onlineUsers').update({ [user.uid]:true })
    }
   })
   return unsubscribe;
 }, [])
 return (
   <Router>
     <div className="app-wrap">
       <Switch>
         <Route path="https://ammm4.github.io/firebase-tic-tac-toe/login" render={ (props) => <SignInForm { ...props } handleLogin={ handleLogin }/> }/>
         <Route exact path="https://ammm4.github.io/firebase-tic-tac-toe/" render={ (props) => !loading? <Homepage {...props} userId={ user } signOut={ signOut }/> : <Redirect to="https://ammm4.github.io/firebase-tic-tac-toe/login" /> } />
         <Route path="https://ammm4.github.io/firebase-tic-tac-toe/signup" render={ (props) => <SignUpForm { ...props } handleSignup={ handleSignup }/> }/>
       </Switch>
     </div>           
   </Router>
 )
}

export default App;
