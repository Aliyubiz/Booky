// scripts/reader.js

const viewer = document.getElementById('book-viewer');
const title = document.getElementById('book-title');

// Get book name from URL
const params = new URLSearchParams(window.location.search);
const bookName = params.get('book');

// Example: Map book name to file (in real site, load from database)
const bookFiles = {
  'bone-forest': 'books/bone-forest.pdf',
  '1984': 'books/1984.pdf',
  'time-machine': 'books/time-machine.pdf'
};

if (bookFiles[bookName]) {
  viewer.src = bookFiles[bookName];
  title.textContent = `Reading: ${bookName.replace(/-/g, ' ')}`;
} else {
  title.textContent = 'Book not found';
  viewer.style.display = 'none';
}
