import React from 'react';
import { Stack } from 'expo-router';
import { CardProvider } from '../CardContext';

export default function Layout() {
  return (
    <CardProvider>
      <Stack screenOptions={{ headerShown: true, title: "Birthday Card" }} />
    </CardProvider>
  );
}
