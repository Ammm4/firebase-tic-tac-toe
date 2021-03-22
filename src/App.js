
import {React, useState, useEffect} from 'react';
import SignInForm from './components/signInForm/signIn';
import Homepage from './components/homepage/homepage';
import './App.css';


function App() {
  const users = [
                 {
                   username:'Monk', email: 'amit@cardiff.com', password: 'tansen123', online: true, friends:['Fighter','Warrior']
                 },
                 {
                 username:'Fighter', email: 'suraj@helsinki.com', password: 'dhamkada123', online: true, friends:['Monk','Warrior']
                 },
                 {
                  username:'Warrior', email: 'lok@london.com', password: 'jhapa123', online: true, friends:['Monk','Fighter']
                 }
  ];
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  const [error, setError] = useState("");

  const signIn = (logInDetails) => {
    users.map(user => {
         if (logInDetails.email === user.email && logInDetails.password === user.password){
           console.log('You have Signed up!!');        
           //setisLoggedIn(true);
           setUser(user);
           console.log(isLoggedIn);
           setError("");
         }    
    })
  }
  useEffect( () => {
      if(!isLoggedIn){
        setError("Incorrect email or password")
      }
  }, [isLoggedIn])

  const signOut = () => {
   setUser(null);
  }

  return (
    <div className="App">
      {(user)? <Homepage signOut={signOut} user={user} /> : <SignInForm signIn={signIn} error={error}/>}
       
    </div>
  );
}

export default App;
