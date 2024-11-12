import React from 'react';
import TabLayout from '@/screens/TabLayout';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
      <>
      <StatusBar backgroundColor='transparent' style='dark'/>
      <TabLayout />
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmokey",
    flex: 1,
    paddingHorizontal: 20
  }
})