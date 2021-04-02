import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyC9CmsdbQtQ1gJ0kdUV-xVdZtt9Suughzo",
  authDomain: "my-tic-tac-toe-project.firebaseapp.com",
  databaseURL: "https://my-tic-tac-toe-project-default-rtdb.firebaseio.com/",
  storageBucket: "my-tic-tac-toe-project.appspot.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export default database;


