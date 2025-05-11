// app/event/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEvents } from '../../context/EventsContext'; // Ajusta la ruta si es necesario

/**
 * Pantalla que muestra los detalles de un evento específico.
 * Obtiene el ID del evento de los parámetros de la ruta.
 */
export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); // Obtiene el ID de la ruta
  const { getEventById } = useEvents(); // Obtiene la función para buscar evento del contexto

  if (!id) {
    // Esto no debería ocurrir si la navegación es correcta, pero es una buena práctica verificar
    return (
      <SafeAreaView style={styles.centeredMessageContainer}>
        <Text style={styles.errorText}>ID de evento no proporcionado.</Text>
      </SafeAreaView>
    );
  }
  
  const event = getEventById(id);

  if (!event) {
    return (
      <SafeAreaView style={styles.centeredMessageContainer}>
        <ActivityIndicator size="large" color="tomato" style={{marginBottom: 10}}/>
        <Text style={styles.loadingText}>Cargando detalles del evento...</Text>
        {/* O un mensaje de error si después de un tiempo no carga */}
        {/* <Text style={styles.errorText}>Evento no encontrado.</Text> */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: event.imageUri }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{event.title}</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Fecha:</Text>
            <Text style={styles.detailValue}>{event.date}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Hora:</Text>
            <Text style={styles.detailValue}>{event.time}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Lugar:</Text>
            <Text style={styles.detailValue}>{event.location}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Categoría:</Text>
            <Text style={styles.detailValue}>{event.category}</Text>
          </View>
          
          <Text style={styles.descriptionTitle}>Descripción:</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { // Bloque 1
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: { // Bloque 2
    paddingBottom: 20, // Espacio al final del scroll
  },
  image: { // Bloque 3
    width: '100%',
    height: 280, // Imagen más grande para detalle
    resizeMode: 'cover',
  },
  contentContainer: { // Bloque 4
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  title: { // Bloque 5
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 18,
  },
  detailItem: { // Bloque 6: Para cada par etiqueta-valor
    flexDirection: 'row', // Flexbox: etiqueta y valor en la misma línea
    marginBottom: 10,
    alignItems: 'flex-start', // Alinea al inicio si el texto tiene múltiples líneas
  },
  detailLabel: { // Bloque 7
    fontSize: 16,
    fontWeight: '600', // Semi-bold
    color: '#555',
    marginRight: 8,
    width: 90, // Ancho fijo para las etiquetas para mejor alineación
  },
  detailValue: { // Bloque 8
    fontSize: 16,
    color: '#444',
    flex: 1, // Para que el valor ocupe el resto del espacio y haga wrap si es largo
  },
  descriptionTitle: { // Bloque 9
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  description: { // Bloque 10
    fontSize: 16,
    color: '#444',
    lineHeight: 24, // Mejor legibilidad para párrafos largos
  },
  centeredMessageContainer: { // Bloque 11: Para mensajes de carga o error
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: { // Bloque 12
    fontSize: 17,
    color: 'red',
    textAlign: 'center',
  },
  loadingText: { // Bloque 13
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  }
});