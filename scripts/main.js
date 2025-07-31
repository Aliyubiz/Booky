// scripts/main.js

const books = [
  {
    title: "The Bone Forest",
    author: "Robert Holdstock",
    img: "images/default-cover.jpg",
    link: "book.html?book=bone-forest"
  },
  {
    title: "1984",
    author: "George Orwell",
    img: "images/default-cover.jpg",
    link: "book.html?book=1984"
  },
  {
    title: "The Time Machine",
    author: "H.G. Wells",
    img: "images/default-cover.jpg",
    link: "book.html?book=time-machine"
  }
];

const container = document.getElementById("book-list");

books.forEach(book => {
  const card = document.createElement("div");
  card.className = "book-card";
  card.innerHTML = `
    <img src="${book.img}" alt="${book.title}">
    <div class="info">
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <a href="${book.link}">Read Online</a>
    </div>
  `;
  container.appendChild(card);
});
