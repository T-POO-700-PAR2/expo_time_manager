// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration



const firebaseConfig = {
  apiKey: "AIzaSyAeZvqraG5WptF4fNNOefqlS1QYrcscXEM",
  authDomain: "vue-time-manager-9cab4.firebaseapp.com",
  projectId: "vue-time-manager-9cab4",
  storageBucket: "vue-time-manager-9cab4.appspot.com",
  messagingSenderId: "1009852703106",
  appId: "1:1009852703106:web:4487928796e63799146f9b"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };
