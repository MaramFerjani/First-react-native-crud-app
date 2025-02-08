import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { updateBook } from '@/database';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  EditBook: { book: Book; onEdit: (updatedBook: Book) => void };
};

type Book = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

type EditBookRouteProp = RouteProp<RootStackParamList, 'EditBook'>;
type EditBookNavigationProp = StackNavigationProp<RootStackParamList, 'EditBook'>;

const EditBook = ({ route }: { route: EditBookRouteProp }) => {
  const { book, onEdit } = route.params;
  const navigation = useNavigation<EditBookNavigationProp>();

  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [image, setImage] = useState(book.image || '');

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

  const handleSave = () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Erreur', 'Le titre et la description sont obligatoires');
      return;
    }

    const updatedBook = { ...book, title, description, image };

    updateBook(book.id, title, description, image, (success) => {
      if (success) {
        onEdit(updatedBook);
        navigation.goBack();
      } else {
        Alert.alert('Erreur', "Une erreur est survenue lors de la mise à jour du livre");
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
          <Button title="Enregistrer" onPress={handleSave} />
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
    flex: 1,
  },
  input: { 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    marginBottom: 10, 
    paddingVertical: 5, 
    fontSize: 14, 
    width: 180 
  },
});

export default EditBook;
