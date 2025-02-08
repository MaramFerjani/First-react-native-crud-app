import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { BookContext } from './bookProvider';

const Panier: React.FC = () => {
  const { state, dispatch } = useContext(BookContext);
  const { bookedBooks } = state;

  return (
    <View style={styles.container}>
      {bookedBooks.length > 0 ? (
        <FlatList
          data={bookedBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>Quantité: {item.quantity}</Text>
                  <Text style={styles.price}>Prix: {item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>Le panier est vide.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8DC",
    paddingTop: 10,
    paddingBottom: 10, 
    paddingRight: 10,
    paddingLeft: 10,
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
  price: {
    fontSize: 18,
    color: "#000",
  },
  emptyMessage: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Panier;
