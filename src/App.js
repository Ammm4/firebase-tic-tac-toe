
import {React, useState} from 'react';
import SignInForm from './components/signInForm/signIn'
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
  const [user, setUser] = useState({name:"", email:""});

  const [error, setError] = useState("");

  const signIn = (logInDetails) => {
    users.map(user => {
         if (logInDetails.email === user.email && logInDetails.password === user.password){
           console.log('You have Signed up!!')
         } else {
           setError("Incorrect email or password!")
         }
    })
  }

  const signOut = () => {
   console.log("Bye!!")
  }

  return (
    <div className="App">
       <SignInForm signIn={signIn} error={error}/>
    </div>
  );
}

export default App;
