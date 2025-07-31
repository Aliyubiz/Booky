// scripts/upload.js

import { storage, db } from './firebase.js';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
  collection,
  addDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById('upload-form');
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('book-author');
const fileInput = document.getElementById('book-file');
const statusText = document.getElementById('upload-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const file = fileInput.files[0];

  if (!title || !author || !file) {
    alert("Fill all fields and select a file!");
    return;
  }

  const filePath = `books/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, filePath);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      statusText.textContent = `Uploading: ${progress.toFixed(1)}%`;
    },
    (error) => {
      console.error(error);
      statusText.textContent = "Upload failed!";
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      await addDoc(collection(db, "books"), {
        title,
        author,
        url: downloadURL,
        timestamp: Timestamp.now()
      });
      statusText.textContent = "✅ Upload complete!";
      form.reset();
    }
  );
});
