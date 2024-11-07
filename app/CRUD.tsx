import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useCardContext } from '../CardContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CRUD: React.FC = () => {
  const { savedCards, removeCard, updateCard } = useCardContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState<{ text: string; image: string | null } | null>(null);
  const [editedCardText, setEditedCardText] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Render each card in the list
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

  // View card details
  const handleViewCard = (card: { text: string; image: string | null }) => {
    setCurrentCard(card);
    setEditIndex(null); // Ensure view mode
    setIsModalVisible(true);
  };

  // Edit card details
  const handleEditCard = (card: { text: string; image: string | null }, index: number) => {
    setEditedCardText(card.text);
    setCurrentCard(card);
    setEditIndex(index);
    setIsModalVisible(true);
  };

  // Save edited card
  const handleSaveEditedCard = () => {
    if (editIndex !== null && currentCard) {
      const updatedCard = {
        text: editedCardText,
        image: currentCard.image || null,
      };
      updateCard(editIndex, updatedCard);
    }
    closeModal();
  };

  // Delete card with confirmation alert
  const handleDeleteCard = (index: number) => {
    removeCard(index);
  };

  // Close modal and reset state
  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentCard(null);
    setEditIndex(null);
    setEditedCardText('');
  };

  if (savedCards.length === 0) {
    return (
      <View style={styles.container}>
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
      <Modal visible={isModalVisible} onRequestClose={closeModal} animationType="slide">
        <View style={styles.modalContainer}>
          {editIndex === null ? (
            <>
              <Text style={styles.modalHeader}>View Card</Text>
              <Text style={styles.modalText}>{currentCard?.text}</Text>
              {currentCard?.image && <Image source={{ uri: currentCard.image }} style={styles.cardImage} />}
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
          <Button title="Close" onPress={closeModal} />
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
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 5,
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
