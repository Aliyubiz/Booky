// scripts/loadBooks.js

import { db } from './firebase.js';
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const booksContainer = document.getElementById('books');

const fetchBooks = async () => {
  try {
    const q = query(collection(db, "books"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const book = doc.data();
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <a href="book.html?url=${encodeURIComponent(book.url)}" target="_blank">📖 Read Book</a>
      `;
      booksContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching books: ", error);
    booksContainer.innerHTML = "<p>Failed to load books.</p>";
  }
};

fetchBooks();
