// scripts/upload.js

import { storage, db } from './firebase.js';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import {
  collection,
  addDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const uploadBtn = document.getElementById("upload-btn");

if (uploadBtn) {
  uploadBtn.addEventListener("click", async () => {
    const title = document.getElementById("book-title").value;
    const bookFile = document.getElementById("book-file").files[0];
    const coverFile = document.getElementById("cover-image").files[0];

    if (!title || !bookFile || !coverFile) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Upload book
      const bookRef = ref(storage, `books/${Date.now()}_${bookFile.name}`);
      await uploadBytes(bookRef, bookFile);
      const bookURL = await getDownloadURL(bookRef);

      // Upload cover
      const coverRef = ref(storage, `covers/${Date.now()}_${coverFile.name}`);
      await uploadBytes(coverRef, coverFile);
      const coverURL = await getDownloadURL(coverRef);

      // Save to Firestore
      await addDoc(collection(db, "books"), {
        title: title,
        bookURL: bookURL,
        coverURL: coverURL,
        uploadedAt: Timestamp.now()
      });

      alert("Book uploaded successfully!");
      window.location.href = "index.html";

    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  });
}
