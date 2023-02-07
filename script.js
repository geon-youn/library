let myLibrary = [];

book_container = document.querySelector("#books");

function Book(author, title, n_pages, read) {
    this.author = author;
    this.title = title;
    this.n_pages = n_pages;
    this.read = read;
}

function addBookToLibrary(...args) {
    const book = new Book(...args);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    book_container.textContent = "";
    for (let book of myLibrary) {
        div = document.createElement("div");
        div.classList.add("book");

        for (let prop in book) {
            inner = document.createElement("div");
            inner.classList.add(prop);
            inner.textContent = book[prop];
            div.append(inner);
        }

        book_container.append(div);
    }
}

book_form = document.querySelector("#book_form");

new_book = document.querySelector("#new_book");
new_book.addEventListener("click", () => {
    book_form.removeAttribute("style");
});

book_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const et = e.target;
    addBookToLibrary(
        et.author.value,
        et.title.value,
        et.n_pages.value,
        et.read.checked
    );
    et.author.value = "";
    et.title.value = "";
    et.n_pages.value = "";
    et.read.checked = false;
    et.setAttribute("style", "display: none;");
});

displayBooks();
