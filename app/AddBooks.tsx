import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { addBook } from '@/database';
import { RootStackParamList } from '@/routes';
import { Ionicons } from '@expo/vector-icons';

type AddBookRouteProp = RouteProp<RootStackParamList, 'AddBook'>;

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigation = useNavigation();
  const route = useRoute<AddBookRouteProp>();

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission refusée", "Vous devez autoriser l'accès à la galerie !");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddBook = () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Erreur', 'Le titre et la description sont obligatoires');
      return;
    }

    addBook(title, description, image, (success, insertedId) => {
      if (success && route.params.onAdd) {
        route.params.onAdd({ id: insertedId, title, description, image });
        Alert.alert('Succès', 'Le livre a été ajouté avec succès');
        navigation.goBack();
      } else {
        Alert.alert('Erreur', "Une erreur est survenue lors de l'ajout du livre");
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Ionicons name="camera-outline" size={40} color="#888" />
          )}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Titre"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <Button title="Ajouter" onPress={handleAddBook} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFF8DC' 
  },
  form: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 50, 
    borderRadius: 10, 
    elevation: 5 
  },
  imagePicker: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  image: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 10 
  },
  inputContainer: {
    flex: 2,
  },
  input: { 
    borderBottomWidth: 2, 
    borderBottomColor: '#ccc', 
    marginBottom: 10, 
    paddingVertical: 5, 
    fontSize: 14, 
    width: 180 
  },
});

export default AddBook;
