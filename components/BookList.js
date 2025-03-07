// src/components/BookList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, deleteBook } from '../actions/bookActions';

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books.books);

  useEffect(() => {
    // Fetch books from the database and dispatch the setBooks action
    dispatch(setBooks(fetchedBooks)); // fetchedBooks should be the result from your getBooks function
  }, [dispatch]);

  return (
    <div>
      {books.map(book => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <button onClick={() => dispatch(deleteBook(book.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
