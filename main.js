//Event listener of button add
const add = document.querySelector(".btn-add");
add.addEventListener("click", getForm);

//Array to store all the book objects
let myLibrary = [];

//book constructor
function Book(title, author, pages, status, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = id;
}

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


//function to add the book object to the array
function addBook(e) {
    let title, author, pages, readStatus, id, form;

    //get the inputs from the form
    title = document.querySelector('input[type="text"]').value;
    // console.log(title);
    author = document.querySelector('.writer').value;
    pages = document.querySelector('.page').value;
    readStatus = document.querySelector('.readStatus').value;
    id = Math.random().toString(16).slice(2) + (new Date()).getTime() + Math.random().toString(16).slice(2);
    form = document.querySelector('form');

    //make the instance of the object constructor and push to the array
    const myBook = new Book(title, author, pages, readStatus, id);
    myLibrary.push(myBook);

    //remove the form from display
    e.preventDefault();
    form.style.display = "none";

    //call the store function to store book
    store();
}

//store book in local storage and grab books from local storage
function store() {
    localStorage.setItem("Books", JSON.stringify(myLibrary));
    //clear the items from display and grab them from ls
    document.querySelector('.bookContainer').innerHTML = '' //without this, everytime one book is added ,checkBookArr() will continue to display all books despite having them in display.
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
    //for creating div title
    const book_title = document.createElement('div');
    book_title.textContent = book.title;
    book_title.classList.add('title');
    bookCard.appendChild(book_title);


    //for creating div author
    const div_author = document.createElement('div');
    div_author.innerHTML = '<span>Author:</span>' + book.author;
    div_author.classList.add('div');
    bookCard.appendChild(div_author);

    container.appendChild(bookCard)

    //for creating div page no
    const no_of_pages = document.createElement('div');
    no_of_pages.innerHTML = '<span>No of Page:</span>' + book.pages
        //  console.log(pages);
    no_of_pages.classList.add('div');
    bookCard.appendChild(no_of_pages);


    //for creating read status
    const status = document.createElement('div');
    status.innerHTML = '<span>Status:</span>' + book.status;
    //console.log(status);
    status.classList.add('div');
    status.style.marginBottom = "1.5em";
    bookCard.appendChild(status);

    //creating label and appending it to the card
    const toggleLabel = document.createElement('label');
    toggleLabel.classList.add('switch');
    bookCard.appendChild(toggleLabel);

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
    toggleSpan.classList.add('slider', 'slider::before', 'round');
    toggleLabel.appendChild(toggleSpan);

    //set toggleInput value as per staus of book
    if (book.status === true) {
        toggleInput.checked = true;
        status.innerHTML = '<span>Status:</span>' + 'Read';
        bookCard.style.backgroundColor = "wheat"

    } else {
        toggleInput.checked = false;
        status.innerHTML = '<span>Status:</span>' + 'Not Read';
        bookCard.style.backgroundColor = "rgb(245, 245, 244)";
    }

    //add toggle ability to each book 'read' button on click
    toggleInput.addEventListener('click', () => {
        book.status = !book.status;
        if (book.status === true) {
            status.innerHTML = '<span>Status:</span>' + 'Read';
            bookCard.style.backgroundColor = "wheat"
        } else {
            status.innerHTML = '<span>Status:</span>' + 'Not Read';
            bookCard.style.backgroundColor = "rgb(245, 245, 244)";
        }
        localStorage.setItem('Books', JSON.stringify(myLibrary));
    });

    //create delete button with each new book
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.textContent = 'Remove';
    bookCard.appendChild(removeBtn);
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
            const remove_fromArr = myLibrary.splice(indexOf_item, 1);
            //console.log(remove_fromArr);
            localStorage.setItem("Books", JSON.stringify(myLibrary));
            e.target.parentNode.remove();

        })
    })
};
setId();



// function remove() {
//     //make existing remove btn work
//     const removeDom = document.querySelector('.remove');
//     removeDom.addEventListener("click", function() {
//         //console.log('deleted');
//         removeDom.parentNode.parentNode.remove();
//     })
// }

/*
 //function for existing item's togglebar management
function toggle(){
const scrollBar = document.querySelector('.scrollBar');
scrollBar.addEventListener("click",function(){
  // console.log('hey');
   if(scrollBar.checked==true){
      const status = document.querySelector('.status');
      status.innerHTML = '<span>Status:</span>'  +  'Read';
      const card = document.querySelector('.card');
      card.style.backgroundColor = "wheat";


   } else if(scrollBar.checked==false){
      const status = document.querySelector('.status');
      status.innerHTML = '<span>Status:</span>'  +  'Unread';
      const card = document.querySelector('.card');
      card.style.backgroundColor = "rgb(245, 245, 244)";


   }
})
}

toggle();*/