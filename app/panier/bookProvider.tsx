import React, { createContext, useReducer } from 'react';

// Définir les types des actions
type Action = 
  | { type: 'ADD_TO_PANIER'; payload: any }
  // Ajoute d'autres actions selon tes besoins

// Définir l'état initial
const initialState = {
  bookedBooks: [] as any[],
  // Ajoute d'autres états selon tes besoins
};

// Créer le contexte
export const BookContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Créer le reducer
const bookReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'ADD_TO_PANIER':
      const existingBookIndex = state.bookedBooks.findIndex(book => book.id === action.payload.id);
      if (existingBookIndex !== -1) {
        // Mettre à jour la quantité du livre existant
        const updatedBooks = [...state.bookedBooks];
        updatedBooks[existingBookIndex].quantity += action.payload.quantity;
        return {
          ...state,
          bookedBooks: updatedBooks,
        };
      }
      return {
        ...state,
        bookedBooks: [...state.bookedBooks, action.payload],
      };
    // Ajoute d'autres cases selon tes besoins
    default:
      return state;
  }
};

// Créer le provider
export const BookProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};
