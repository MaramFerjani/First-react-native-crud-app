// src/components/AddBook.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../actions/bookActions';

const AddBook = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = () => {
    const newBook = { id: Date.now(), title, description, image };
    dispatch(addBook(newBook));
    setTitle('');
    setDescription('');
    setImage('');
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" />
      <button onClick={handleSubmit}>Add Book</button>
    </div>
  );
};

export default AddBook;
