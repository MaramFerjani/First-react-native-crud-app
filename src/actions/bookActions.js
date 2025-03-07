// src/actions/bookActions.js
export const addBook = (book) => ({
    type: 'ADD_BOOK',
    payload: book,
  });
  
  export const deleteBook = (id) => ({
    type: 'DELETE_BOOK',
    payload: id,
  });
  
  export const updateBook = (book) => ({
    type: 'UPDATE_BOOK',
    payload: book,
  });
  
  export const setBooks = (books) => ({
    type: 'SET_BOOKS',
    payload: books,
  });
  