

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC_sXy9IkUryzxWUkou6uZ5D6UxaraG_sE",
  authDomain: "uavproject-feb15.firebaseapp.com",
  projectId: "uavproject-feb15",
  storageBucket: "uavproject-feb15.appspot.com",
  messagingSenderId: "639231304042",
  appId: "1:639231304042:web:8de2cd704f5620b3358513"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFireStoreApp = () =>{
    return app;
}