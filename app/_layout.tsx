// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { EventsProvider } from '../context/EventsContext'; // Ajusta la ruta si es necesario

/**
 * Layout raíz de la aplicación.
 * Configura el Stack Navigator principal y envuelve la aplicación con EventsProvider.
 */
export default function RootLayout() {
  return (
    <EventsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="event/[id]"
          options={{
            title: 'Detalles del Evento',
            headerBackTitle: 'Atrás', // Título del botón de retroceso en iOS
            headerTintColor: 'tomato', // Color del título y botón de retroceso
          }}
        />
      </Stack>
    </EventsProvider>
  );
}