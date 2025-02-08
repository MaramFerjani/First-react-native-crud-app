// Details.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Details: { bookId: string }; 
  Cart: { bookId: string; quantity: number }; 
};

type BookDetailsProps = {
  route: RouteProp<RootStackParamList, 'Details'>;
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
};

const Details: React.FC<BookDetailsProps> = ({ route, navigation }) => {
  const { bookId } = route.params; 

  const book = {
    "1": { title: "Le Petit Prince", description: "Un voyage magique", author: "Antoine de Saint-Exupéry", price: "15€", image: require("../assets/images/book.jpg") },
    "2": { title: "Harry Potter", description: "L'école des sorciers", author: "J.K. Rowling", price: "25€" , image: require("../assets/images/book.jpg")},
    "3": { title: "Le Seigneur des Anneaux", description: "Une quête épique", author: "J.R.R. Tolkien", price: "30€" , image: require("../assets/images/book.jpg")},
    "4": { title: "1984", description: "Un monde dystopique", author: "George Orwell", price: "20€" , image: require("../assets/images/book.jpg")},
    "5": { title: "Moby Dick", description: "La chasse à la baleine", author: "Herman Melville", price: "18€" , image: require("../assets/images/book.jpg")},
    "6": { title: "To Kill a Mockingbird", description: "Une leçon de justice", author: "Harper Lee", price: "22€" , image: require("../assets/images/book.jpg")},
    "7": { title: "Pride and Prejudice", description: "Les péripéties d'une jeune femme", author: "Jane Austen", price: "19€" , image: require("../assets/images/book.jpg")},
    "8": { title: "The Great Gatsby", description: "Un amour perdu dans les années folles", author: "F. Scott Fitzgerald", price: "23€" , image: require("../assets/images/book.jpg")},
    "9": { title: "War and Peace", description: "La guerre et la paix à travers les yeux de personnages", author: "Leo Tolstoy", price: "35€" , image: require("../assets/images/book.jpg")},
    "10": { title: "Les Misérables", description: "L'histoire de la rédemption et du sacrifice", author: "Victor Hugo", price: "28€", image: require("../assets/images/book.jpg") },
    "11": { title: "The Catcher in the Rye", description: "Le quotidien d'un adolescent perdu", author: "J.D. Salinger", price: "16€" , image: require("../assets/images/book.jpg")},
    "12": { title: "The Odyssey", description: "Un voyage épique de retour chez soi", author: "Homer", price: "20€" , image: require("../assets/images/book.jpg")},
    "13": { title: "Brave New World", description: "Une société contrôlée et parfaite", author: "Aldous Huxley", price: "18€" , image: require("../assets/images/book.jpg")},
    "14": { title: "Frankenstein", description: "Un scientifique et sa créature", author: "Mary Shelley", price: "17€", image: require("../assets/images/book.jpg") },
    "15": { title: "Dracula", description: "L'histoire d'un vampire", author: "Bram Stoker", price: "21€", image: require("../assets/images/book.jpg") },
    "16": { title: "The Picture of Dorian Gray", description: "Un homme qui ne vieillit pas", author: "Oscar Wilde", price: "24€" , image: require("../assets/images/book.jpg")},
    "17": { title: "Crime and Punishment", description: "Un meurtrier en quête de rédemption", author: "Fyodor Dostoevsky", price: "26€" , image: require("../assets/images/book.jpg")},
    "18": { title: "The Hobbit", description: "Les aventures de Bilbo Baggins", author: "J.R.R. Tolkien", price: "22€" , image: require("../assets/images/book.jpg")},
    "19": { title: "Jane Eyre", description: "L'histoire d'une femme indépendante", author: "Charlotte Brontë", price: "19€" , image: require("../assets/images/book.jpg")},
    "20": { title: "The Brothers Karamazov", description: "Une enquête sur la moralité", author: "Fyodor Dostoevsky", price: "30€", image: require("../assets/images/book.jpg") },
  }[bookId];

  const handleAddToCart = () => {
    navigation.navigate('Cart', { bookId, quantity: 1 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book?.title}</Text>
      <Text style={styles.author}>Author: {book?.author}</Text>
      <Text style={styles.description}>{book?.description}</Text>
      <Image source={book?.image} style={styles.image} />
      <Text style={styles.price}>Prix: {book?.price}</Text>
      <Button title="Ajouter au panier" onPress={handleAddToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 18,
    color: '#555',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#777',
  },
  image: {
    width: 200,
    height: 300,
    marginVertical: 15,
  },
  price: {
    fontSize: 18,
    color: '#000',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default Details;
