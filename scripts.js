




  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
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

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert("Signed up successfully");
      
      // Save additional user information to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email
      });

      window.location.href = 'dashboard.html';
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error ${errorCode}: ${errorMessage}`);
      alert("user is alredy")
    }
  });

  const loginWithGoogleBtn = document.getElementById("loginWithGoogleBtn");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        alert(user, "Signed in with Google successfully");

        // Save additional user information to Firestore if not already present
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          await setDoc(userRef, {
            username: user.displayName,
            email: user.email
          });
        }

        window.location.href = 'dashboard.html';
      }).catch((error) => {
        console.error("Error signing in with Google: ", error);
      });
  };

  if (loginWithGoogleBtn) {
    loginWithGoogleBtn.addEventListener("click", signInWithGoogle);
  }

  const onLoad = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user, "user");
        window.location.href = 'dashboard.html';
      } else {
        alert("No user is logged in");
      }
    });
  };

  onLoad();
});

const logout = () => {
  auth.signOut().then(() => {
    console.log("User signed out");
    window.location.href = 'sginup.html'; // Redirect to login page or any other page after logout
  }).catch((error) => {
    console.log(error.message);
  });
};

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}








// Firebase configuration

