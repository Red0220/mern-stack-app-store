// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHhl0ylL7mmzR3AlvQZ285IEW47CF4wjk",
  authDomain: "appstore-49c9c.firebaseapp.com",
  projectId: "appstore-49c9c",
  storageBucket: "appstore-49c9c.firebasestorage.app",
  messagingSenderId: "806553490762",
  appId: "1:806553490762:web:c996ef684081e3cca55db3",
  measurementId: "G-C50LP56HE4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
