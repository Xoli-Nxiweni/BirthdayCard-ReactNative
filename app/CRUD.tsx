import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';
import { useCardContext } from '../CardContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icons

const CRUD: React.FC = () => {
  const { savedCards, removeCard, updateCard } = useCardContext(); // Assuming updateCard is part of context
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState<{ text: string; image: string | null } | null>(null);
  const [editedCardText, setEditedCardText] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const renderItem = ({ item, index }: { item: { text: string; image: string | null }; index: number }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.text}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.cardImage} />}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleViewCard(item)}>
          <Icon name="eye" size={30} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleEditCard(item, index)}>
          <Icon name="pencil" size={30} color="#FF9800" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteCard(index)}>
          <Icon name="trash-can" size={30} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleViewCard = (card: { text: string; image: string | null }) => {
    setCurrentCard(card);
    setIsModalVisible(true);
  };

  const handleEditCard = (card: { text: string; image: string | null }, index: number) => {
    setEditedCardText(card.text);
    setEditIndex(index);
    setIsModalVisible(true);
  };

  const handleSaveEditedCard = () => {
    if (editIndex !== null) {
      const updatedCard = { text: editedCardText, image: currentCard?.image || null };
      updateCard(editIndex, updatedCard);
    }
    setIsModalVisible(false);
  };

  const handleDeleteCard = (index: number) => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this card?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => removeCard(index),
        },
      ]
    );
  };

  if (savedCards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your Saved Cards</Text>
        <Text style={styles.emptyStateText}>No saved cards yet. Create a card to get started!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Saved Cards</Text>
      <FlatList
        data={savedCards}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        extraData={savedCards}
        ListEmptyComponent={<Text style={styles.emptyStateText}>No cards available</Text>}
      />
      <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)} animationType="slide">
        <View style={styles.modalContainer}>
          {currentCard && !editIndex ? (
            <>
              <Text style={styles.modalHeader}>View Card</Text>
              <Text style={styles.modalText}>{currentCard.text}</Text>
              {currentCard.image && <Image source={{ uri: currentCard.image }} style={styles.cardImage} />}
            </>
          ) : (
            <>
              <Text style={styles.modalHeader}>Edit Card</Text>
              <TextInput
                value={editedCardText}
                onChangeText={setEditedCardText}
                style={styles.input}
                placeholder="Edit card text"
              />
              <Button title="Save" onPress={handleSaveEditedCard} />
            </>
          )}
          <Button title="Close" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: '10px',
  },
  iconButton: {
    marginBottom: 10, // Add spacing between icons
  },
  modalContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default CRUD;
