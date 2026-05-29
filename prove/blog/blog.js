const articles = [
  {
    id: 1,
    title: "Septimus Heap Book One: Magyk",
    date: "July 5, 2022",
    description:
      "If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.",
    imgSrc: "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg",
    imgAlt: "Book cover for Septimus Heap 1",
    ages: "10-14",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐",
  },
  {
    id: 2,
    title: "Magnus Chase Book One: Sword of Summer",
    date: "December 12, 2021",
    description:
      "The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.",
    imgSrc:
      "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
    imgAlt: "Book cover for Magnus Chase 1",
    ages: "12-16",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐",
  },
  {
    id: 3,
    title: "Belgariad Book One: Pawn of Prophecy",
    date: "Feb 12, 2022",
    description:
      "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
    imgSrc: "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
    imgAlt: "Book cover for Pawn of Prophecy",
    ages: "12-16",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐⭐",
  },
];

const articleList = document.querySelector("#article-list");

function toDateValue(dateText) {
  const parsedDate = new Date(dateText);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().split("T")[0];
}

function getStarCount(stars) {
  return Array.from(stars).length;
}

function createArticleMarkup(article) {
  const headingId = `post-heading-${article.id}`;
  const starCount = getStarCount(article.stars);
  const dateValue = toDateValue(article.date);

  return `
    <article class="post" aria-labelledby="${headingId}">
      <aside
        class="post-meta"
        aria-label="Publication date, age range, genre, and rating"
      >
        <span class="meta-rating-divider" aria-hidden="true"></span>
        <dl class="meta-list">
          <div class="meta-row">
            <dt class="visually-hidden">Published</dt>
            <dd><time datetime="${dateValue}">${article.date}</time></dd>
          </div>
          <div class="meta-row">
            <dt class="visually-hidden">Suggested age range</dt>
            <dd>${article.ages}</dd>
          </div>
          <div class="meta-row">
            <dt class="visually-hidden">Genre</dt>
            <dd>${article.genre}</dd>
          </div>
        </dl>
        <div
          class="rating-stars"
          role="img"
          aria-label="Rating: ${starCount} out of 5 stars"
        >
          <span aria-hidden="true">${article.stars}</span>
        </div>
      </aside>

      <span class="post-divider" aria-hidden="true"></span>

      <div class="post-body">
        <h2 id="${headingId}" class="post-title">${article.title}</h2>
        <div class="post-cover">
          <img src="${article.imgSrc}" alt="${article.imgAlt}" width="260" />
        </div>
        <p class="post-description">${article.description}</p>
      </div>
    </article>
  `;
}

if (articleList) {
  articleList.innerHTML = articles.map(createArticleMarkup).join("");
}
