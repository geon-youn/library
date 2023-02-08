let myLibrary = [];

book_container = document.querySelector("#books");

class Book {
    author;
    title;
    n_pages;
    read;
    
    constructor(author, title, n_pages, read) {
        this.author = author;
        this.title = title;
        this.n_pages = n_pages;
        this.read = read;
    }
}

function addBookToLibrary(...args) {
    const book = new Book(...args);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    book_container.textContent = "";
    for (let idx in myLibrary) {
        const book = myLibrary[idx];
        const div = document.createElement("div");
        div.classList.add("book");
        div.textContent = `"${book.title}" by "${book.author}" (${book.n_pages} pages)`;
        if (book.read) {
            div.classList.add("read");
        }

        const div2 = document.createElement("div");
        const btn = document.createElement("button");
        btn.setAttribute("data-idx", idx);
        btn.classList.add("remove-book");
        btn.addEventListener("click", (e) => {
            myLibrary.splice(e.target.getAttribute("data-idx"), 1);
            displayBooks();
        });
        btn.textContent = "Remove";
        div2.append(btn);

        const btn2 = document.createElement("button");
        btn2.setAttribute("data-idx", idx);
        btn2.classList.add("toggle-read");
        btn2.addEventListener("click", (e) => {
            const i = e.target.getAttribute("data-idx");
            myLibrary[i].read = !myLibrary[i].read;
            displayBooks();
        });
        btn2.textContent = book.read ? "Not Read" : "Read";
        div2.append(btn2);
        div.append(div2);
        book_container.append(div);
    }
}

book_form = document.querySelector("#book_form");

new_book = document.querySelector("#new_book");
new_book.addEventListener("click", (e) => {
    book_form.removeAttribute("style");
    e.target.setAttribute("style", "display: none;");
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
    new_book.removeAttribute("style");
});

displayBooks();
