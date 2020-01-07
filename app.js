const form = document.querySelector("#book-form");
const bookList = document.querySelector(".collection");
const bookInput = document.querySelector("#book");
const filterInput = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-books");

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getBooks);
    form.addEventListener('submit', addBook);
    bookList.addEventListener('click', removeBook);
    clearBtn.addEventListener('click', clearBooks);
    filterInput.addEventListener('keyup', filterBooks);
}

function getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    }
    else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(function (book) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(book));

        const link =  document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '❌';
        li.appendChild(link);
        bookList.appendChild(li);

    });
}

function addBook(event) {
    if (bookInput.value === '') {
        alert('Enter a book');
    }

    const li = document.createElement('li');

    li.className = 'collection-item';
    li.appendChild(document.createTextNode(bookInput.value));

    const link = document.createElement('a');

    link.className = 'delete-item secondary-content';
    link.innerHTML = '❌';
    li.appendChild(link);
    bookList.appendChild(li);

    storeInLocalStorage(bookInput.value);
    bookInput.value = '';

    event.preventDefault();
}

function removeBook(event) {
    console.log('test');
    if (event.target.classList.contains('delete-item')) {
        if (confirm('Are you sure about that?')) {
            event.target.parentElement.remove();

            removeBookFromLocalStorage(event.target.parentElement);
        }
    }
}

function removeBookFromLocalStorage(bookItem){
    let books;

    if(localStorage.getItem('books') === null){
        books = [];
    } else{
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(function(book,index){
        if(bookItem.textContent.slice(0, -1) === book){
            books.splice(index, 1);
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
}

function clearBooks() {
    if (confirm('Are you sure about that?')) {
        while (bookList.firstChild) {
            bookList.removeChild(bookList.firstChild);
        }
        localStorage.clear();
    }
}


function filterBooks(event) {
    const userFilter = event.target.value.toLowerCase();
    //console.log(userFilter);

    document.querySelectorAll(".collection-item").forEach(function (book) {
        const item = book.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(userFilter) != -1) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
}

function storeInLocalStorage(book) {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}
