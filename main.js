const myLibrary = [];
const libraryContainer = document.querySelector('.library-container')
const addBook = document.querySelector('#add-book')
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

const test = document.querySelector('#test');
const dialog = document.getElementById('dialog');



function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return(this.title + " by " + this.author + ", " + this.pages + ", " + this.read); // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

addBook.addEventListener('click', () => {
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var pages = document.getElementById('pages').value;
    var read = document.querySelector('input[name="read"]:checked').value;
    var book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    addBookCard(book);
    inputReset();
    closeModal();
})

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'finished');
const rur = new Book('R.U.R.', 'Karel Čapek', '102 pages', 'not read yet');

addBookToLibrary(theHobbit);
addBookToLibrary(rur);

function loadBooks(booksToLoad) {
    booksToLoad.forEach(addBookCard);
}

function addBookCard(book) {
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    var titleDiv = document.createElement('div');
    var authorDiv = document.createElement('div');
    var pagesDiv = document.createElement('div');
    var readDiv = document.createElement('div');
    titleDiv.innerHTML = book.title;
    authorDiv.innerHTML = book.author;
    pagesDiv.innerHTML = book.pages;
    readDiv.innerHTML = book.read;
    libraryContainer.appendChild(cardDiv);
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(authorDiv);
    cardDiv.appendChild(pagesDiv);
    cardDiv.appendChild(readDiv);
}

loadBooks(myLibrary);

function inputReset() {
    document.getElementById('title').value = ""
    document.getElementById('author').value = ""
    document.getElementById('pages').value = ""
}

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

closeModalBtn.addEventListener('click', closeModal)
openModalBtn.addEventListener('click', openModal)

test.addEventListener('click',() => {
    dialog.showModal();
})