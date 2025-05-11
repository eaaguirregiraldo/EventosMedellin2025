import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EventListItem from '../../components/EventListItem';
import { useEvents } from '../../context/EventsContext';
import { EventType } from '../../types/event';

export default function EventListScreen() {
  const { events = [] as EventType[] } = useEvents() || {};
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Categorías fijas o puedes extraerlas dinámicamente
  const categories = ['Todos', 'Música', 'Cultura', 'Deporte', 'Tecnología'];

  const filteredEvents = selectedCategory && selectedCategory !== 'Todos'
    ? events.filter((event) => event.category === selectedCategory)
    : events;

  const renderEventItem = ({ item }: { item: EventType }) => (
    <EventListItem event={item} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonSelected,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === cat && styles.categoryButtonTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredEvents.length === 0 ? (
          <Text style={styles.emptyListText}>
            No hay eventos disponibles en esta categoría.
          </Text>
        ) : (
          <FlatList
            data={filteredEvents}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContentContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  container: {
    flex: 1,
    paddingTop: 8,
  },
  listContentContainer: {
    paddingBottom: 16,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 17,
    color: '#777',
  },
  categoryScroll: {
    flexGrow: 0,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginRight: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
});
