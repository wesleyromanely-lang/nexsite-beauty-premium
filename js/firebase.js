// Firebase Nexsite Beauty

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {

apiKey: "AIzaSyCEr_H6AX5P0QLxR85HmyWGXkSPVYDgKFo",

authDomain: "next-beauty-site.firebaseapp.com",

databaseURL: "https://next-beauty-site-default-rtdb.firebaseio.com",

projectId: "next-beauty-site",

storageBucket: "next-beauty-site.firebasestorage.app",

messagingSenderId: "481492521726",

appId: "1:481492521726:web:081d9290b12820dab54baf"

};


// Inicializar

const app = initializeApp(firebaseConfig);


// Banco de dados

const db = getFirestore(app);


// Login

const auth = getAuth(app);


export {
app,
db,
auth
};
