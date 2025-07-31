// scripts/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3jVuXnanch0wln-SfzEwftNEyYlmb5ro",
  authDomain: "booky-web.firebaseapp.com",
  projectId: "booky-web",
  storageBucket: "booky-web.appspot.com",
  messagingSenderId: "821717089975",
  appId: "1:821717089975:web:beb5b5639e5623eb01d732"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
