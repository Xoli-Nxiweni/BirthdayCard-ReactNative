// screens/TabLayout.tsx
import CreateCard from '@/app/CreateCard';
import CRUD from '@/app/CRUD';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';


const TabLayout: React.FC = () => {
  const [text, setText] = useState<string>('Happy Birthday!');
  const [fontSize, setFontSize] = useState<number>(20);
  const [image, setImage] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.header}>Create Your Birthday Card</Text> */}
      <CreateCard/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default TabLayout;
