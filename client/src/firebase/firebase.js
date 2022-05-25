  
import firebase from 'firebase/compat/app';
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBly_CO5f4YrbC1neGfiTTl0d5OaRAa8HY",
    authDomain: "jades2-4c762.firebaseapp.com",
    projectId: "jades2-4c762",
    storageBucket: "jades2-4c762.appspot.com",
    messagingSenderId: "581019417708",
    appId: "1:581019417708:web:4bfc46f2050d7bc2adac49",
    measurementId: "G-JVSVR92YX4"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }


const storage = firebase.storage();

export { storage, firebase as default };