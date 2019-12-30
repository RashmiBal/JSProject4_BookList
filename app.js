// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
// add book, show book, delete book all UI
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // create tr element
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = function(msg, className) {
  // create div
  const ele = document.createElement("div");
  // Add class name to this div
  ele.className = `alert ${className}`;
  // Add alert text inside this div
  ele.appendChild(document.createTextNode(msg));
  // Get parent, get Form, Insert new div before Form
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(ele, form);
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Event Listeners
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // Instantiate Book
  const book = new Book(title, author, isbn);
  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("Please enter all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Show success
    ui.showAlert("Book Added!", "success");
    // Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for Delete
document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();
  // Delete book
  ui.deleteBook(e.target);
  //Show alert
  ui.showAlert("Book Removed!", "success");
  e.preventDefault();
});
