// src/reducers/bookReducer.js
const initialState = {
    books: [],
  };
  
  const bookReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_BOOK':
        return {
          ...state,
          books: [...state.books, action.payload],
        };
      case 'DELETE_BOOK':
        return {
          ...state,
          books: state.books.filter(book => book.id !== action.payload),
        };
      case 'UPDATE_BOOK':
        return {
          ...state,
          books: state.books.map(book =>
            book.id === action.payload.id ? action.payload : book
          ),
        };
      case 'SET_BOOKS':
        return {
          ...state,
          books: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default bookReducer;
  