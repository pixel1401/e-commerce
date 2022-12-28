import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA3zN3Y5YqN5uqJusDv4UjspVLKTnJuyRw",
    authDomain: "e-commerce-react-93874.firebaseapp.com",
    projectId: "e-commerce-react-93874",
    storageBucket: "e-commerce-react-93874.appspot.com",
    messagingSenderId: "19070594761",
    appId: "1:19070594761:web:97ce8e60303dc533af6718"
  };


  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();
export {auth , fs  , storage};





export const firebaseCollectionName = {
    users : 'users',
    products : 'products'
} 



export const storageFolder = {
  imageFolder : 'product-img'
}

