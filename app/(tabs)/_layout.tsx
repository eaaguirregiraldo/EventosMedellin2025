// app/(tabs)/_layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

/**
 * Componente de icono para la barra de pestañas.
 * @param props Propiedades del icono, incluyendo nombre y color.
 * @returns Un componente FontAwesome.
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

/**
 * Layout para la navegación por pestañas.
 * Define las pestañas "Eventos" y "Añadir Evento".
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          // Ejemplo de estilo para la barra de pestañas
          // backgroundColor: '#f8f8f8',
          // borderTopWidth: 1,
          // borderTopColor: '#e0e0e0',
        },
        headerStyle: {
          // backgroundColor: 'tomato', // Estilo para el header de las pestañas
        },
        // headerTintColor: '#fff', // Color del texto del header
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
      }}>
      <Tabs.Screen
        name="events" // Corresponde a app/(tabs)/events.tsx
        options={{
          title: 'Eventos',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
          headerTitle: 'Eventos en Medellín 2025',
        }}
      />
      <Tabs.Screen
        name="add-event" // Corresponde a app/(tabs)/add-event.tsx
        options={{
          title: 'Añadir',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
          headerTitle: 'Crear Nuevo Evento',
        }}
      />
    </Tabs>
  );
}