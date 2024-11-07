import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { useCardContext } from '../CardContext';

const CreateCard: React.FC = () => {
  const navigation = useNavigation();
  const { addCard } = useCardContext();
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  const saveCard = () => {
    console.log("Current text value:", text);
    if (!text.trim()) {
      console.log("Text is empty or whitespace");
      Alert.alert("Text Required", "Please add some text to your card.");
      return;
    }
    
    
    console.log("4")
    const newCard = { text, image };
    console.log("5")
    addCard(newCard);
    console.log("6")
    Alert.alert("Card Saved", "Your card has been saved successfully.");
    console.log("7")
    setText('');
    console.log("8")
    setImage(null);
    console.log("9")
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Your Birthday Card</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your message"
        value={text}
        onChangeText={setText}
        multiline
      />
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Pick an Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      <TouchableOpacity style={styles.saveButton} onPress={saveCard}>
        <Text style={styles.saveButtonText}>Save Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.manageButton} onPress={() => navigation.navigate("CRUD")}>
        <Text style={styles.manageButtonText}>Manage Saved Cards</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  imageButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  manageButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  manageButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CreateCard;
