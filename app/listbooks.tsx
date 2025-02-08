import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Details: { bookId: string }; 
};

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

const books = [
  { id: "1", title: "Le Petit Prince", description: "Un voyage magique", image: require("../assets/images/book.jpg") },
  { id: "2", title: "Harry Potter", description: "L'école des sorciers", image: require("../assets/images/book.jpg") },
  { id: "3", title: "Le Seigneur des Anneaux", description: "Une quête épique", image: require("../assets/images/book.jpg") },
  { id: "4", title: "1984", description: "Un monde dystopique", image: require("../assets/images/book.jpg") },
  { id: "5", title: "Moby Dick", description: "La chasse à la baleine", image: require("../assets/images/book.jpg") },
  { id: "6", title: "To Kill a Mockingbird", description: "Une leçon de justice", image: require("../assets/images/book.jpg") },
  { id: "7", title: "Pride and Prejudice", description: "Les péripéties d'une jeune femme", image: require("../assets/images/book.jpg") },
  { id: "8", title: "The Great Gatsby", description: "Un amour perdu dans les années folles", image: require("../assets/images/book.jpg") },
  { id: "9", title: "War and Peace", description: "La guerre et la paix à travers les yeux de personnages", image: require("../assets/images/book.jpg") },
  { id: "10", title: "Les Misérables", description: "L'histoire de la rédemption et du sacrifice", image: require("../assets/images/book.jpg") },
  { id: "11", title: "The Catcher in the Rye", description: "Le quotidien d'un adolescent perdu", image: require("../assets/images/book.jpg") },
  { id: "12", title: "The Odyssey", description: "Un voyage épique de retour chez soi", image: require("../assets/images/book.jpg") },
  { id: "13", title: "Brave New World", description: "Une société contrôlée et parfaite", image: require("../assets/images/book.jpg") },
  { id: "14", title: "Frankenstein", description: "Un scientifique et sa créature", image: require("../assets/images/book.jpg") },
  { id: "15", title: "Dracula", description: "L'histoire d'un vampire", image: require("../assets/images/book.jpg") },
  { id: "16", title: "The Picture of Dorian Gray", description: "Un homme qui ne vieillit pas", image: require("../assets/images/book.jpg") },
  { id: "17", title: "Crime and Punishment", description: "Un meurtrier en quête de rédemption", image: require("../assets/images/book.jpg") },
  { id: "18", title: "The Hobbit", description: "Les aventures de Bilbo Baggins", image: require("../assets/images/book.jpg") },
  { id: "19", title: "Jane Eyre", description: "L'histoire d'une femme indépendante", image: require("../assets/images/book.jpg") },
  { id: "20", title: "The Brothers Karamazov", description: "Une enquête sur la moralité", image: require("../assets/images/book.jpg") },
];

export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();

  const goToDetails = (bookId: string) => {
    navigation.navigate('Details', { bookId }); 
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToDetails(item.id)}>
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8DC",
    paddingTop: 10,
    paddingBottom: 10, 
    paddingRight: 10,
    paddingLeft: 10
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 120,
    resizeMode: "cover",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
