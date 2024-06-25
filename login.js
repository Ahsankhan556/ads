
let submitForm = document.getElementById("form_submit");
let email = document.getElementById("email");
let password = document.getElementById("password");
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider , signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBekhP5RArZ9FGy4x9Z5De_AebIWGR3ncI",
  authDomain: "ads-website-4bf00.firebaseapp.com",
  projectId: "ads-website-4bf00",
  storageBucket: "ads-website-4bf00.appspot.com",
  messagingSenderId: "172888440903",
  appId: "1:172888440903:web:87a0f20c97058d27587162",
  measurementId: "G-91CFRJ5EJ7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);



// console.log(formElement);

submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(email.value , password.value);



if(email.value && password.value){
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    window.location.href = 'dashboard.html';
    
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    alert("user is not found")
  });
}
  });





 