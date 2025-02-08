import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BookContext } from './panier/bookProvider';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Cart: { bookId: string; quantity: number }; // Paramètres pour le panier
};

type CartProps = {
  route: RouteProp<RootStackParamList, 'Cart'>;
  navigation: StackNavigationProp<RootStackParamList, 'Cart'>;
};

const Cart: React.FC<CartProps> = ({ route }) => {
  const { bookId, quantity } = route.params;
  const context = useContext(BookContext);
  //@ts-ignore
  const { bookedBooks, dispatch } = context;

  const book = {
    "1": { id: "1", title: "Le Petit Prince", price: 15, image: require("../assets/images/book.jpg") },
    "2": { id: "2", title: "Harry Potter à l'École des Sorciers", price: 25, image: require("../assets/images/book.jpg") },
    "3": { id: "3", title: "Le Seigneur des Anneaux", price: 25, image: require("../assets/images/book.jpg") },
    "4": { id: "4", title: "1984", price: 25, image: require("../assets/images/book.jpg") },
    "5": { id: "5", title: "Moby Dick", price: 25, image: require("../assets/images/book.jpg") },
    "6": { id: "6", title: "To Kill a Mockingbird", price: 25, image: require("../assets/images/book.jpg") },
    "7": { id: "7", title: "Pride and Prejudice", price: 25, image: require("../assets/images/book.jpg") },
    "8": { id: "8", title: "The Great Gatsby", price: 25, image: require("../assets/images/book.jpg") },
    "9": { id: "9", title: "War and Peace", price: 25, image: require("../assets/images/book.jpg") },
    "10": { id: "10", title: "Les Misérables", price: 25, image: require("../assets/images/book.jpg") },
    "11": { id: "11", title: "The Catcher in the Rye", price: 25, image: require("../assets/images/book.jpg") },
    "12": { id: "12", title: "The Odyssey", price: 25, image: require("../assets/images/book.jpg") },
    "13": { id: "13", title: "Brave New World", price: 25, image: require("../assets/images/book.jpg") },
    "14": { id: "14", title: "Frankenstein", price: 25, image: require("../assets/images/book.jpg") },
    "15": { id: "15", title: "Dracula", price: 25, image: require("../assets/images/book.jpg") },
    "16": { id: "16", title: "The Picture of Dorian Gray", price: 25, image: require("../assets/images/book.jpg") },
    "17": { id: "17", title: "Crime and Punishment", price: 25, image: require("../assets/images/book.jpg") },
    "18": { id: "18", title: "The Hobbit", price: 25, image: require("../assets/images/book.jpg") },
    "19": { id: "19", title: "Jane Eyre", price: 25, image: require("../assets/images/book.jpg") },
    "20": { id: "20", title: "The Brothers Karamazov", price: 25, image: require("../assets/images/book.jpg") },
  }[bookId];

  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const navigation = useNavigation();

  const increaseQuantity = () => setCurrentQuantity(prev => prev + 1);
  const decreaseQuantity = () => setCurrentQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleConfirm = () => {
    dispatch({ type: 'ADD_TO_PANIER', payload: { ...book, quantity: currentQuantity } });
    navigation.navigate('Panier');
  };

  const totalPrice = book?.price * currentQuantity;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book?.title}</Text>
      <Image source={book?.image} style={styles.image} />
      <Text style={styles.price}>Prix: {totalPrice}€</Text>
      <View style={styles.quantityContainer}>
        <Button title="-" onPress={decreaseQuantity} />
        <Text style={styles.quantity}>{currentQuantity}</Text>
        <Button title="+" onPress={increaseQuantity} />
      </View>
      <Button title="Valider" onPress={handleConfirm} />
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
  price: {
    fontSize: 18,
    color: '#000',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 300,
    marginVertical: 15,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 15,
  },
});

export default Cart;
