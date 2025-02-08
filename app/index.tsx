import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createTable, getBooks, deleteBook } from '@/database';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  AddBook: { onAdd: (book: Book) => void };
  EditBook: { book: Book; onEdit: (updatedBook: Book) => void };
};

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Book = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigation = useNavigation<HomeNavigationProp>();

  useEffect(() => {
    createTable();
    loadBooks();
  }, []);

  const loadBooks = () => {
    getBooks((booksData: Book[]) => {
      if (Array.isArray(booksData)) {
        setBooks(booksData);
      } else {
        setBooks([]);
        console.error("Erreur : les données reçues ne sont pas un tableau.");
      }
    });
  };

  const handleAddBook = (book: Book) => {
    setBooks((currentBooks) => [...currentBooks, book]);
  };

  const goToAddBook = () => {
    navigation.navigate('AddBook', { onAdd: handleAddBook });
  };

  const handleDeleteBook = (id: number) => {
    deleteBook(id, (success) => {
      if (success) {
        setBooks((currentBooks) => currentBooks.filter(book => book.id !== id));
      }
    });
  };

  const handleEditBook = (book: Book) => {
    navigation.navigate('EditBook', {
      book,
      onEdit: (updatedBook) => {
        setBooks((currentBooks) =>
          currentBooks.map((b) => (b.id === updatedBook.id ? updatedBook : b))
        );
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Liste des livres</Text>
        <TouchableOpacity style={styles.addButton} onPress={goToAddBook}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={() => handleEditBook(item)}>
                <Ionicons name="pencil-outline" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteBook(item.id)}>
                <Ionicons name="trash-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF8DC',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  iconButton: {
    paddingHorizontal: 5,
  },
  addButton: {
    backgroundColor: '#008CBA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
