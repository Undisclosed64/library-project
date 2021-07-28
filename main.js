
//Array to store all the book objects
let myLibrary = [];

//book constructor
class Book{
    constructor(title, author, pages, status, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = id;
}
}
//Event listener of button add
const add = document.querySelector(".btn-add");
add.addEventListener("click", getForm);

//function to get the form for submitting book inputs
function getForm() {
    //select the form,submit button
    const form = document.querySelector('form');
    const btnSubmit = document.querySelector('.submit');
    //show the form up by changing it's display to block from none.
    form.style.display = "block";
    //add event listener to submit
    btnSubmit.addEventListener("click", addBook);
}
function closeForm(){
const form = document.querySelector('form');
const closeForm = document.querySelector('.close');
closeForm.addEventListener("click",function(){
    form.style.display = "none";
})
}
closeForm();

function validator() {
    let title, author, pages;

    title = document.querySelector('input[type="text"]').value;
    author = document.querySelector('.writer').value;
    pages = document.querySelector('.page').value;

    return title !== '' && author !== '' && pages !== '';
}
//function to add the book object to the array
function addBook(e) {
   if (!validator()) {
        return;
   }
    let title, author, pages, readStatus, id, form;

    //get the inputs from the form
    title = document.querySelector('input[type="text"]').value;
    author = document.querySelector('.writer').value;
    pages = document.querySelector('.page').value;
    readStatus = document.querySelector('.readStatus').value;
   // console.log(readStatus);
    id = Math.random().toString(16).slice(2) + (new Date()).getTime() + Math.random().toString(16).slice(2);
    form = document.querySelector('form');

    //make the instance of the object constructor and push to the array
    const myBook = new Book(title, author, pages, readStatus, id);
    myLibrary.push(myBook);
     
    //clear input fields
    title = document.querySelector('input[type="text"]');
    author = document.querySelector('.writer');
    pages = document.querySelector('.page');
    readStatus = document.querySelector('.readStatus');
    
    title.value = "";
    author.value = "";
    pages.value = "";
    readStatus.value = "";

    //remove the form from display
    e.preventDefault();
    form.style.display = "none";

    //show the success msg after adding book
    const successMsg = document.querySelector('.successPopup');
    successMsg.style.display = "block";
    window.setTimeout("document.querySelector('.successPopup').style.display='none';", 4000);

    //call the store function to store book
    store();
}

//store book in local storage and grab books from local storage
function store() {
    localStorage.setItem("Books", JSON.stringify(myLibrary));
    //clear the existing items from display and grab them from ls
    document.querySelector('.bookContainer').innerHTML = '';
    checkBookArr();
}

//check book array and call display function on the array for displaying all books
function checkBookArr() {
    for (let i = 0; i < myLibrary.length; i++) {
        displayBook(myLibrary[i]);
    }
    //calling removeItem here in order to have remove btns in dom immediately after adding,without the need to refresh
    removeItem();
}

//restore the books once page is refreshed
function retrieveBook() {
    if (!localStorage.Books) {
        console.log('no books in storage');
    } else {
        let books = localStorage.getItem('Books');
        books = JSON.parse(books);
        // console.log(books);
        myLibrary = books;
        checkBookArr();
    }
}
retrieveBook();

//display book
function displayBook(book) {
    //select container nad create book card
    const container = document.querySelector('.bookContainer');
    const bookCard = document.createElement('section');
    bookCard.classList.add('card');
    bookCard.id = book.id;

    //create parent div for card content
    const cardContent = document.createElement("div");
    cardContent.classList.add("cardContent");

    //for creating div title
    const book_title = document.createElement('div');
    book_title.textContent = book.title;
    book_title.classList.add('title');
    cardContent.appendChild(book_title)
   
    //for creating div author
    const author_ = document.createElement('div');
    author_.innerHTML = '<span>Author:</span>' + book.author;
    author_.classList.add('div');
    cardContent.appendChild(author_)

    //for creating div page no
    const no_of_pages = document.createElement('div');
    no_of_pages.innerHTML = '<span>No of Page:</span>' + book.pages
    //console.log(pages);
    no_of_pages.classList.add('div');
    cardContent.appendChild(no_of_pages)

    //for creating read status
    const status = document.createElement('div');
    status.innerHTML = '<span>Status:</span>' + book.status;
    //console.log(status);
    status.classList.add('div');
    status.style.marginBottom = "1em";
    cardContent.appendChild(status)

    //creating label and appending it to the card
    const toggleLabel = document.createElement('label');
    toggleLabel.classList.add('switch');
    cardContent.appendChild(toggleLabel)
    toggleLabel.style.margin = "0 auto"

    //creating input
    let toggleInput = document.createElement('input');
    toggleInput.type = "checkbox";

    //adding input style and appending input to the label
    toggleInput.style.opacity = "0";
    toggleInput.style.width = "0";
    toggleInput.style.height = "0";
    toggleLabel.appendChild(toggleInput);

    //creating span,adding classes and appending it to the label
    const toggleSpan = document.createElement('span');
    toggleSpan.classList.add('slider', /*'slider::before',*/ 'round');
    toggleLabel.appendChild(toggleSpan);

    //set toggleInput value as per staus of book
    if (book.status === true || book.status === 'yes') {
        toggleInput.checked = true;
        status.innerHTML = '<span>Status:</span>' + 'Read';
    } else {
        toggleInput.checked = false;
        status.innerHTML = '<span>Status:</span>' + 'Not Read';
    }

    //add toggle ability to each book 'read' button on click
    toggleInput.addEventListener('click', () => {
      book.status = !book.status;
     if (book.status === true) {
            status.innerHTML = '<span>Status:</span>' + 'Read';
            toggleInput.checked = true;  
        } else {
            status.innerHTML = '<span>Status:</span>' + 'Not Read';
           toggleInput.checked = false;
        }
        localStorage.setItem('Books', JSON.stringify(myLibrary));
    });
   

    //create delete button with each new book
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.textContent = 'Remove';
    cardContent.appendChild(removeBtn);

    bookCard.appendChild(cardContent);

    container.appendChild(bookCard)
}
//get id of book object and set id to book card
function setId() {
    let ids = myLibrary.map(function(book) {
        return book.id;
   });
    const bookCards = document.querySelectorAll('.card');
    const bookCards_arr = Array.prototype.slice.call(bookCards);
   for (let i = 0; i < ids.length; i++) {
        //console.log([i]);
   }
    for (let i = 0; i < bookCards_arr.length; i++) {
        bookCards_arr[i].id = ids[i];
        // console.log(bookCards_arr[i]);

    }
}

//remove book from local storage on delete btn click
function removeItem() {
    const removeBtn = document.querySelectorAll('.remove');
    removeBtn.forEach(function(removeButton) {
        removeButton.addEventListener("click", function(e) {
            // console.log('clicked');
            const clickedItem = e.target.parentNode.id;
            // console.log(clickedItem);
            var item = myLibrary.find(item => item.id === clickedItem);
            //console.log(item);
            let indexOf_item = myLibrary.indexOf(item);
            //console.log(indexOf_item);
            myLibrary.splice(indexOf_item, 1);
            //console.log(remove_fromArr);
            localStorage.setItem("Books", JSON.stringify(myLibrary));
            e.target.parentNode.parentNode.remove();

        })
    })
};
setId();

