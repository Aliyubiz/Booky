// scripts/main.js

import { db } from './firebase.js';
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const bookList = document.getElementById("book-list");

async function loadBooks() {
  try {
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const card = document.createElement("div");
      card.className = "book-card";

      const img = document.createElement("img");
      img.src = data.coverURL;
      img.alt = data.title;

      const title = document.createElement("div");
      title.className = "book-title";
      title.textContent = data.title;

      card.appendChild(img);
      card.appendChild(title);

      // Optional: Make it open the book file when clicked
      card.addEventListener("click", () => {
        window.open(data.bookURL, "_blank");
      });

      bookList.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading books: ", err.message);
    bookList.innerHTML = "<p style='color:red'>Failed to load books.</p>";
  }
}

loadBooks();
