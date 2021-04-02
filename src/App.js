
import {React, useState, useEffect} from 'react';
import SignInForm from './components/signInForm/signIn';
import Homepage from './components/homepage/homepage';
import database from './firebase/config';
import './App.css';


function App() {
  const [users, setUsers] = useState(null);

  const [isLoggedIn, setisLoggedIn] = useState(false);

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
    <div className="App">
      {(user)? <Homepage signOut={signOut} user={user} /> : <SignInForm signIn={signIn} error={error}/>}
       
    </div>
  );
}

export default App;
