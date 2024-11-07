import React, { useState } from 'react';
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { useCardContext } from '../CardContext';

const CreateCard: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
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
    if (!text.trim()) {
      Alert.alert("Text Required", "Please add some text to your card.");
      return;
    }

    const newCard = { text, image };
    addCard(newCard);

    Alert.alert("Card Saved", "Your card has been saved successfully.");
    setText('');
    setImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isActive ? (
        <>
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
        </>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={() => setIsActive(true)}>
          <Text style={styles.startButtonText}>Start the App</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: '#fff',
    // backgroundColor: "green",
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    boxShadow: '1px 2px 5px #ccc',
    outline: 'none',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    borderRadius: 5,
    
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
    borderRadius: 8,
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
  startButton: {
    backgroundColor: '#8A2BE2',
    padding: 15,
    borderRadius: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreateCard;
