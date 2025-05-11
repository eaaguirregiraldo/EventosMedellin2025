// components/EventListItem.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { EventType } from '../types/event';

interface EventListItemProps {
  event: EventType;
}

/**
 * Componente para renderizar un ítem individual en la lista de eventos.
 * @param event El objeto de evento a mostrar.
 */
const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
  const router = useRouter();

  /**
   * Maneja la pulsación sobre un ítem de evento, navegando a la pantalla de detalle.
   */
  const handlePress = () => {
    router.push(`/event/${event.id}`);
  };

  return (
    <Pressable onPress={handlePress} style={styles.itemContainer}>
      <Image source={{ uri: event.imageUri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.dateLocation}>{event.date} - {event.location}</Text>
        <Text style={styles.category}>{event.category}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: { // Bloque 1: Contenedor principal del ítem
    flexDirection: 'row', // Flexbox: imagen y texto en fila
    backgroundColor: '#ffffff',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 8,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: { // Bloque 2: Estilo de la imagen
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  textContainer: { // Bloque 3: Contenedor de los textos
    flex: 1, // Flexbox: ocupa el espacio restante
    justifyContent: 'center', // Flexbox: centra verticalmente el contenido
  },
  title: { // Bloque 4: Estilo del título
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dateLocation: { // Bloque 5: Estilo para fecha y ubicación
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  category: { // Bloque 6: Estilo para la categoría
    fontSize: 12,
    color: 'tomato',
    fontStyle: 'italic',
  }
});

export default EventListItem;