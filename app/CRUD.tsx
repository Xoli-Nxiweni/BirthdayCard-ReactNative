import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
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
          <Icon name="eye" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleEditCard(item, index)}>
          <Icon name="pencil" size={30} color="#FFC107" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            Alert.alert('Delete Card', 'Are you sure you want to delete this card?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', onPress: () => handleDeleteCard(index), style: 'destructive' },
            ])
          }
        >
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

  // Delete card
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Saved Cards</Text>
      {savedCards.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Icon name="card-text-outline" size={80} color="#bbb" />
          <Text style={styles.emptyStateText}>No saved cards yet. Create a card to get started!</Text>
        </View>
      ) : (
        <FlatList
          data={savedCards}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          extraData={savedCards}
        />
      )}

      <Modal visible={isModalVisible} onRequestClose={closeModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {editIndex === null ? (
              <>
                <Text style={styles.modalHeader}>View Card</Text>
                <Text style={styles.modalText}>{currentCard?.text}</Text>
                {currentCard?.image && <Image source={{ uri: currentCard.image }} style={styles.modalImage} />}
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
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveEditedCard}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 5,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CRUD;
