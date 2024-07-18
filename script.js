class Book {
    constructor(title, author, pages, read, index) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = index;
    }
}

class Library {
    library = [];

    get libraryArray() {
        return this.library;
    }

    addBookToLibrary(book) {
        this.library.push(book);
    }

    deleteBook(index) {
        for (let i = index; i < this.library.length; i++) {
            this.library[i].index--;
        }

        this.library.splice(index, 1);
    }
}

class Display {
    static libraryContainer = document.querySelector('.library-container');
    static newButton = document.querySelector('.new');
    static formDisplay = document.querySelector('dialog');

    constructor() {
        this.addButtonDisplayListener();
    }

    static displayLibrary(library) {
        Display.libraryContainer.innerHTML = '';

        for (let book of library) {

            let mark = '';
            if (book.read === 'Yes') {
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
            Display.libraryContainer.appendChild(bookContainer);
        }
    }

    static addButtonDisplayListener() {
        Display.newButton.addEventListener("click", () => {
            Display.formDisplay.showModal();
        });
    }
}

class Controller {
    static form = document.querySelector('form');
    static cancelButton = document.querySelector('.cancel');

    constructor (library) {
        Display.addButtonDisplayListener();
        this.library = library;
        this.bookButtonListener();
        this.submitButtonListener();
        this.cancelButtonListener();
    }

    bookButtonListener() {
        Display.libraryContainer.addEventListener("click", (e) => {
            let parent = e.target.parentNode;
            //Delete Button
            if (e.target.getAttribute('class') === 'delete') {
                this.library.deleteBook(parent.getAttribute('id'));
                parent.remove();
            }
            //Mark Button
            if (e.target.getAttribute('class') === 'mark') {
                if (e.target.innerText === 'Mark Unread') {
                    this.library.libraryArray[parent.getAttribute('id')].read = 'No';
                    e.target.innerText = 'Mark Read';
                }
                else {
                    this.library.libraryArray[parent.getAttribute('id')].read = 'Yes';
                    e.target.innerText = 'Mark Unread';
                }
            }
            Display.displayLibrary(this.library.libraryArray);
        });
    }

    submitButtonListener() {
        Controller.form.addEventListener("submit", (e) => {
            const data = new FormData(e.target);
            const title = data.get('title');
            const author = data.get('author');
            const pages = data.get('pages');
            const read = data.get('read');
        
            let book = new Book(title, author, pages, read, this.library.libraryArray.length);
            this.library.addBookToLibrary(book);
            Display.displayLibrary(this.library.libraryArray);

            Controller.form.reset();
        });
    }

    cancelButtonListener() {
        Controller.cancelButton.addEventListener("click", () => {
            Controller.form.reset();
            Controller.form.close();
        });
    }
}

const myLibrary = new Library();
const controller = new Controller(myLibrary);




