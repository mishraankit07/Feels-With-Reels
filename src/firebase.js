// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDCvy-HyjSrvPD2I8NJLWiiAZVkLNGTT0",
    authDomain: "feels-with-reels.firebaseapp.com",
    projectId: "feels-with-reels",
    storageBucket: "feels-with-reels.appspot.com",
    messagingSenderId: "852495667227",
    appId: "1:852495667227:web:270519854f04d3f4c928be"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts')
}

export const storage=firebase.storage();