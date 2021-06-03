var pl = { model:{}, view:{}, ctrl:{} };

pl.view.listBooks = {
    setupUserInterface: function () {
      var tableBodyEl = document.querySelector("table#books>tbody");
      var i=0, keys=[], key="", row={};
      // load all book objects
      Book.loadAll();
      keys = Object.keys( Book.instances);
      // for each book, create a table row with a cell for each attribute
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        row = tableBodyEl.insertRow();
        row.insertCell(-1).textContent = Book.instances[key].isbn;      
        row.insertCell(-1).textContent = Book.instances[key].title;  
        row.insertCell(-1).textContent = Book.instances[key].year;
      }
    }
  };


  pl.view.createBook = {
    setupUserInterface: function () {
      var saveButton = document.forms['Book'].commit;
      // load all book objects
      Book.loadAll();
      // Set an event handler for the save/submit button
      saveButton.addEventListener("click", 
          pl.view.createBook.handleSaveButtonClickEvent);
      window.addEventListener("beforeunload", function () {
          Book.saveAll(); 
      });
    },
    handleSaveButtonClickEvent: function () {
      var formEl = document.forms['Book'];
      var slots = { isbn: formEl.isbn.value, 
          title: formEl.title.value, 
          year: formEl.year.value};
      Book.add( slots);
      formEl.reset();
    }
  };


  pl.view.updateBook = {
    setupUserInterface: function () {
      var formEl = document.forms['Book'],
          saveButton = formEl.commit,
          selectBookEl = formEl.selectBook;
      var i=0, key="", keys=[], book=null, optionEl=null;
      // load all book objects
      Book.loadAll();
      // populate the selection list with books
      keys = Object.keys( Book.instances);
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        book = Book.instances[key];
        optionEl = document.createElement("option");
        optionEl.text = book.title;
        optionEl.value = book.isbn;
        selectBookEl.add( optionEl, null);
      }
      // when a book is selected, populate the form with the book data
      selectBookEl.addEventListener("change", function () {
          var book=null, key = selectBookEl.value;
          if (key) {
            book = Book.instances[key];
            formEl.isbn.value = book.isbn;
            formEl.title.value = book.title;
            formEl.year.value = book.year;
          } else {
            formEl.isbn.value = "";
            formEl.title.value = "";
            formEl.year.value = "";
          }
      });
      saveButton.addEventListener("click", 
          pl.view.updateBook.handleUpdateButtonClickEvent);
      window.addEventListener("beforeunload", function () {
          Book.saveAll(); 
      });
    },
    // save updated data
    handleUpdateButtonClickEvent: function () {
      var formEl = document.forms['Book'];
      var slots = { isbn: formEl.isbn.value, 
          title: formEl.title.value, 
          year: formEl.year.value
      };
      Book.update( slots);
      formEl.reset();
    }
  };


  pl.view.deleteBook = {
    setupUserInterface: function () {
      var deleteButton = document.forms['Book'].commit;
      var selectEl = document.forms['Book'].selectBook;
      var i=0, key="", keys=[], book=null, optionEl=null;
      // load all book objects
      Book.loadAll();
      keys = Object.keys( Book.instances);
      // populate the selection list with books
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        book = Book.instances[key];
        optionEl = document.createElement("option");
        optionEl.text = book.title;
        optionEl.value = book.isbn;
        selectEl.add( optionEl, null);
      }
      deleteButton.addEventListener("click", 
          pl.view.deleteBook.handleDeleteButtonClickEvent);
      window.addEventListener("beforeunload", function () {
          Book.saveAll(); 
      });
    },
    handleDeleteButtonClickEvent: function () {
      var selectEl = document.forms['Book'].selectBook;
      var isbn = selectEl.value;
      if (isbn) {
        Book.destroy( isbn);
        selectEl.remove( selectEl.selectedIndex);
      }
    }
  };



  