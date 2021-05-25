//Event listener of button add
const add = document.querySelector(".add");
add.addEventListener("click",getForm);


//Array to store all the book objects
let myLibrary = [];

//book constructor
function Book(title,author,pages,status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

//function to get the form for submitting book
function getForm(){
    //select the form,submit button
    const form = document.querySelector('form');
    const btnSubmit = document.querySelector('.submit');
    //show the form up by changing it's display to block from none.
    form.style.display = "block";
    //add event listener to submit
    btnSubmit.addEventListener("click",addBook);

 }

 
 //function to add the book object to the array
  function addBook(e){
  let title,author,pages,readStatus,form;
  //get the inputs from the form
  title = document.querySelector('input[type="text"]').value;
 // console.log(title);
  author = document.querySelector('.writer').value;
  pages = document.querySelector('.page').value;
  readStatus = document.querySelector('.readStatus').value;
  form = document.querySelector('form');
    //make the instance of the object constructor and push to the array
    const myBook = new Book(title,author,pages,readStatus);
    myLibrary.push(myBook);
    //console.log(myBook);
    e.preventDefault();
    form.style.display = "none";
    store();
     }
   
     //store book in ls
     function store(){
        localStorage.setItem("Books",JSON.stringify(myLibrary));
        checkBook();
     }

     //create book
     function checkBook(){
     for(let i = 0;i<myLibrary.length;i++){
        displayBook(myLibrary[i]);
      
     }
     }
     //
     function retrievBook() {
      if(!localStorage.Books) {
          console.log('no books in storage');
      }else {
          let books = localStorage.getItem('Books');
          books = JSON.parse(books);
         // console.log(books);
          myLibrary = books;
          checkBook();
      }
  }
  
  retrievBook();
 
      
 function displayBook(book){
   // console.log(book);
 const container = document.querySelector('.bookContainer');
 const bookCard = document.createElement('section');
  const book_title = document.createElement('div');
  // book_title.textContent = title;
  book_title.textContent = book.title;
   book_title.classList.add('title');
   container.appendChild(bookCard)
   bookCard.appendChild(book_title);
   bookCard.classList.add('card');

   
     //for creating div author
     const div_author = document.createElement('div');
     div_author.innerHTML = '<span>Author:</span>'+ book.author;
     div_author.classList.add('div');
     bookCard.appendChild(div_author);
 
 //for creating div pages
   const no_of_pages = document.createElement('div');
  // o_of_pages.innerHTML = '<span>No of Pagens:</span>' + pages;
    no_of_pages.innerHTML = '<span>No of Page:</span>' + book.pages
  //  console.log(pages);
   no_of_pages.classList.add('div');
   bookCard.appendChild(no_of_pages);
 
 
     //for creating read status
   const status = document.createElement('div');
   status.innerHTML = '<span>Status:</span>'  +  book.status;
   status.classList.add('div');
   bookCard.appendChild(status);
   
    
      //for creating read/unread togglebar
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
     toggleSpan.classList.add('slider','slider::before','round');
     toggleLabel.appendChild(toggleSpan);
   
   
     //change scrollbar status to active if the input is read
     if(status=='Read'){
   toggleInput.checked = true;
   bookCard.style.backgroundColor = "wheat"
    } 
    //change the scrollbar status to false if the input is unread
    else {
      toggleInput.checked = false;
      bookCard.style.backgroundColor = "rgb(245, 245, 244)";
   
    }
   //change textContent of status depending upon scollbar state
    toggleInput.addEventListener("click",function(){
      if(toggleInput.checked == true){
      status.innerHTML = '<span>Status:</span>'  +  'Read';
     // bookCard.style.backgroundColor = "#f9dcc4"
     // bookCard.style.backgroundColor = "#9a8c98";
      bookCard.style.backgroundColor = "wheat";
   
   
      } else if(toggleInput.checked == false) {
         status.innerHTML = '<span>Status:</span>'  +  'Unread';
         bookCard.style.backgroundColor = "rgb(245, 245, 244)";
   
      }
    });
     //create delete button with each new book
     const removeBtn = document.createElement('button');
     removeBtn.classList.add('remove');
     removeBtn.textContent = 'Remove';
     //bookCard.classList.add('content')
     bookCard.appendChild(removeBtn);

};
/*
function removeItem(){
   const removeBtn = document.querySelectorAll('.remove');
  removeBtn.forEach(function(removeButton){
      removeButton.addEventListener("click",createBook)
   })
}*/

function remove(){
    //make existing remove btn work
  const remove = document.querySelector('.remove');
  remove.addEventListener("click",function(){
     remove.parentNode.parentNode.remove();
  })
 }
 
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
 
 toggle();