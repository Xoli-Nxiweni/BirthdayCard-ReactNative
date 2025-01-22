import React, { useState } from 'react';
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { useCardContext } from '../CardContext';

const CreateCard: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigation();
  const { addCard } = useCardContext();
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    setLoading(true);
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'You need to grant permission to select images.');
        setLoading(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        setImage(result.assets[0].uri);
      } else {
        Alert.alert('No Image Selected', 'Please select an image to continue.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Something went wrong while picking the image.');
    } finally {
      setLoading(false);
    }
  };

  const saveCard = () => {
    if (!text.trim()) {
      Alert.alert('Text Required', 'Please add some text to your card.');
      return;
    }

    if (!image) {
      Alert.alert('Image Required', 'Please select an image for your card.');
      return;
    }

    const newCard = { text, image };
    addCard(newCard);

    Alert.alert('Card Saved', 'Your card has been saved successfully.');
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
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.imageButtonText}>Pick an Image</Text>
              )}
            </TouchableOpacity>
          </View>
          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
          <TouchableOpacity
            style={[styles.saveButton, !(text && image) && styles.saveButtonDisabled]}
            onPress={saveCard}
            disabled={!(text && image)}
          >
            <Text style={styles.saveButtonText}>Save Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.manageButton} onPress={() => navigation.navigate('CRUD')}>
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
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#0d0d0daa',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#aaa',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  manageButton: {
    backgroundColor: '#0d0d0daa',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  manageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#8A2BE2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateCard;
