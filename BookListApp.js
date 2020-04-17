class Book {
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.id = price;
    }
}



class Store{
    static getBook(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];

        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books
    }
    static addBook(book){
        const books=Store.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(id){
        const books=Store.getBook();
        books.forEach((book,index)=>{
            if(book.id==id){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }
}


// UI class :handle UI task
class UI {
    static displayBooks() {
       
        const book = Store.getBook();
        book.forEach((book) => UI.addbookToList(book));


    }
    static addbookToList(book) {
        const list = document.querySelector('#book_list');

        const row = document.createElement('tr');
    
        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.id}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    
        list.appendChild(row);
    }
    static clearFields(){
        document.querySelector('#title_id').value=""
        document.querySelector('#author_id').value=""
        document.querySelector('#price_id').value=""
    }
    static deletele(e){ 
        if(e.classList.contains('delete')){
            e.parentElement.parentElement.remove();
        }
    }
    static showalert(msg,type){
        var bookform=document.querySelector("#book_form")
        var div=document.createElement("div");
        div.className=` alert  alert-${type}`;
        div.appendChild(document.createTextNode(msg))
        document.querySelector(".container").insertBefore(div,bookform);

        //timer
        setTimeout(()=> document.querySelector(".alert").remove(),1200);
    }

}


//display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// add a book

document.querySelector("#book_form").addEventListener('submit',(e)=>{
    e.preventDefault();

    var titleval=document.querySelector("#title_id").value;
    var authorval=document.querySelector("#author_id").value;
    var priceval=document.querySelector("#price_id").value;
    if(titleval=='' || authorval=='' || priceval==''){
       UI.showalert("Please fill all the field","danger");
    }
    else{
        const book=new Book(titleval,authorval,priceval);
    // console.log(book);
    UI.addbookToList(book);
    //add book to store
    Store.addBook(book);
    UI.showalert("Book added","success")

    //clear field
    UI.clearFields();
    }
    
});



//remove a book
document.querySelector("#book_list").addEventListener('click',(e)=>{
   UI.deletele(e.target);
   
   Store.removeBook(e.target.parentElement.previousElementSibling.innerText);
    if(e.target.classList.contains('delete')){
        UI.showalert("Book Deleted","success")
    }
    


})