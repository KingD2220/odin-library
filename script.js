let libraryContainer = document.querySelector('.library-container');
let reset = document.querySelector('form');
let myLibrary = [];

function Book(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;

    this.info = function () {
        let readMessage = read ? 'already read' : 'not read yet';
        return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + readMessage;
    }
}


function addBookToLibrary(book) {
    myLibrary.push(book);
    displayLibrary();
}

function displayLibrary() {
    libraryContainer.innerHTML = '';

    for (let book of myLibrary) {

        let mark = '';
        if(book.read === 'Yes') {
            mark = 'Mark Unread';
        }
        else {
            mark = 'Mark Read';
        }

        let bookContainer = document.createElement('div');
        bookContainer.setAttribute('id', `${book.index}`);
        bookContainer.setAttribute('class', 'book-container');
        bookContainer.innerHTML = `<p><strong>Title:</strong> ${book.title}</p> <p><strong>Author:</strong> ${book.author}</p> <p><strong>Pages:</strong> ${book.pages}</p>
         <p class="read"><strong>Read:</strong> ${book.read}</p> <button class="mark">${mark}</button> <button class="delete">Delete</button>`;
        libraryContainer.appendChild(bookContainer);
    }
}

function deleteBook(index) {
    for (let i = index; i < myLibrary.length; i++) {
        myLibrary[i].index--;
    }

    myLibrary.splice(index, 1);
    displayLibrary();
}


//Event Listeners
let newButton = document.querySelector('.new');
let cancelButton = document.querySelector('.cancel');
let form = document.querySelector('dialog');

libraryContainer.addEventListener("click", (e) => {
    let parent = e.target.parentNode;
    //Delete Button
    if (e.target.getAttribute('class') === 'delete') {
        deleteBook(parent.getAttribute('id'));
        parent.remove();
    }
    //Mark Button
    if (e.target.getAttribute('class') === 'mark') {
        if (e.target.innerText === 'Mark Unread') {
            myLibrary[parent.getAttribute('id')].read = 'No';
            e.target.innerText = 'Mark Read';
        }
        else {
            myLibrary[parent.getAttribute('id')].read = 'Yes';
            e.target.innerText = 'Mark Unread';
        }

        displayLibrary();
    }
});

newButton.addEventListener("click", () => {
    form.showModal();
});

form.addEventListener("submit", (e) => {
    const data = new FormData(e.target);
    const title = data.get('title');
    const author = data.get('author');
    const pages = data.get('pages');
    const read = data.get('read');

    let book = new Book(title, author, pages, read, myLibrary.length);

    addBookToLibrary(book);

    reset.reset();
});

cancelButton.addEventListener("click", () => {
    reset.reset();
    form.close();
});





