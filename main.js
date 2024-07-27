let myLibrary = [];
const libraryContainer = document.querySelector('.library-container')
const addBook = document.querySelector('#add-book')
const dialog = document.querySelector("dialog");
const openModal = document.querySelector('#open-modal')
const closeButton = document.getElementById('close-button')
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'finished');
const rur = new Book('R.U.R.', 'Karel Čapek', '102 pages', 'not read yet');

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

function loadCredentials() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.querySelector('input[name="read"]:checked').value;
    let book = new Book(title, author, pages, read);
    return book;
}

addBook.addEventListener('click', () => {
    addBookToLibrary(loadCredentials());
    addBookCard(loadCredentials());
    resetInputs();
})

function loadBooks(booksToLoad) {
    libraryContainer.innerHTML = '';
    booksToLoad.forEach(addBookCard);
}

function addBookCard(book) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    let titleDiv = document.createElement('div');
    let authorDiv = document.createElement('div');
    let pagesDiv = document.createElement('div');
    let readDiv = document.createElement('div');

    titleDiv.innerHTML = book.title;
    authorDiv.innerHTML = book.author;
    pagesDiv.innerHTML = book.pages;
    readDiv.innerHTML = book.read;

    let editButton = document.createElement('button');
    editButton.innerHTML = 'EDIT';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => {
        editBookDialogPopUp(book.title)
    });

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'DELETE';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        let position = myLibrary.indexOf(book);
        myLibrary.splice(position,1);
        loadBooks(myLibrary);
    });

    let toggleReadButton = document.createElement('button');
    toggleReadButton.innerHTML = 'TOGGLE READ';
    toggleReadButton.classList.add('toggle-button');
    toggleReadButton.addEventListener('click', () => {
        toggleRead(book);
        readDiv.innerHTML = book.read;
    });

    closeButton.addEventListener('click', () => {
        dialog.close();
    })

    libraryContainer.appendChild(cardDiv);
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(authorDiv);
    cardDiv.appendChild(pagesDiv);
    cardDiv.appendChild(readDiv);
    cardDiv.appendChild(editButton);
    cardDiv.appendChild(deleteButton);
    cardDiv.appendChild(toggleReadButton)

    dialog.close();
}

function resetInputs() {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";
    document.querySelector('input[name="read"]:checked').checked = false;
}

openModal.addEventListener('click', () => {
    dialog.showModal();
})

function editBookDialogPopUp(bookTitle) {
    const book = myLibrary.find(b => b.title === bookTitle);
    dialog.showModal();
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('pages').value = book.pages;
    if (book.read === 'finished') {
        document.getElementById('finished').checked = true;
    }
    else {
        document.getElementById('not-read-yet').checked = true;
    }
    addBook.hidden = true;
    closeButton.hidden = true;

    let editButton = document.createElement('button');
    editButton.innerHTML = 'EDIT BOOK';
    dialog.appendChild(editButton);

    editButton.addEventListener('click', () => {
        editBook(book);
        editButton.remove();
        discardChangesButton.remove();
    })

    let discardChangesButton = document.createElement('button');
    discardChangesButton.innerHTML = 'CANCEL';
    dialog.appendChild(discardChangesButton);

    discardChangesButton.addEventListener('click', () => {
        resetInputs();
        editButton.remove();
        discardChangesButton.remove();
        dialog.close();
        addBook.hidden = false;
        closeButton.hidden = false;
    })
}

function editBook(book) {
    let position = myLibrary.indexOf(book);
    let editedBook = loadCredentials();
    myLibrary[position] = editedBook;
    loadBooks(myLibrary);
    resetInputs();
    addBook.hidden = false;
}

function toggleRead(book) {
    if (book.read === 'finished') {
        book.read = 'not read yet';
    } 
    else {
        book.read = 'finished';
    }
}

addBookToLibrary(theHobbit);
addBookToLibrary(rur);
loadBooks(myLibrary);