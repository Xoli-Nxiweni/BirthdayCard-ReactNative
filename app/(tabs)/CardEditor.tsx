// app/CardEditor.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';



export default function CardEditor() {
  return (
    <View style={styles.container}>
      <Text>Card Editor</Text>

      {/* <Decorations /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});
