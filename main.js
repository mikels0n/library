const myLibrary = [];
const libraryContainer = document.querySelector('.library-container')
const addBook = document.querySelector('#add-book')


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
    console.log(myLibrary);
})

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'yes');
const rur = new Book('R.U.R.', 'Karel Čapek', '102 pages', );

addBookToLibrary(theHobbit)
addBookToLibrary(rur);

console.log(myLibrary);
