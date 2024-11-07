import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Card = { text: string; image: string | null };
type CardContextType = {
  savedCards: Card[];
  addCard: (card: Card) => void;
  removeCard: (index: number) => void;
  updateCard: (index: number, updatedCard: Card) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedCards, setSavedCards] = useState<Card[]>([]);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const savedCardsData = await AsyncStorage.getItem('savedCards');
        if (savedCardsData) {
          setSavedCards(JSON.parse(savedCardsData));
        }
      } catch (error) {
        console.error('Error loading saved cards', error);
      }
    };

    loadCards();
  }, []);

  const saveCardsToStorage = async (cards: Card[]) => {
    try {
      await AsyncStorage.setItem('savedCards', JSON.stringify(cards));
    } catch (error) {
      console.error('Error saving cards to AsyncStorage', error);
    }
  };

  const addCard = (card: Card) => {
    const updatedCards = [...savedCards, card];
    setSavedCards(updatedCards);
    saveCardsToStorage(updatedCards);
  };

  const removeCard = (index: number) => {
    const updatedCards = savedCards.filter((_, i) => i !== index);
    setSavedCards(updatedCards);
    saveCardsToStorage(updatedCards);
  };

  // const updateCard = (index: number, updatedCard: Card) => {
  //   const updatedCards = savedCards.map((card, i) =>
  //     i === index ? updatedCard : card
  //   );
  //   setSavedCards(updatedCards);
  //   saveCardsToStorage(updatedCards);
  // };

  const updateCard = (index: number, updatedCard: { text: string; image: string | null }) => {
    setSavedCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[index] = updatedCard; // Replace the updated card at the specific index
      return newCards;
    });
  };
  

  return (
    <CardContext.Provider value={{ savedCards, addCard, removeCard, updateCard }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error('useCardContext must be used within a CardProvider');
  return context;
};
