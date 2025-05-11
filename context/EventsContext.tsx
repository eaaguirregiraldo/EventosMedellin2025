// context/EventsContext.tsx
import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { INITIAL_MOCK_EVENTS } from '../data/mockEvents';
import { EventFormData, EventType } from '../types/event';

interface EventsContextType {
  events: EventType[];
  addEvent: (eventData: EventFormData) => void;
  getEventById: (id: string) => EventType | undefined;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventType[]>(INITIAL_MOCK_EVENTS);

  const addEvent = useCallback(
    (eventData: EventFormData) => {
      const newEvent: EventType = {
        ...eventData,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 7), // ID más único
      };
      setEvents((prevEvents) => [newEvent, ...prevEvents]);
    },
    [setEvents] // Dependencia: setEvents
  );


  const getEventById = useCallback((id: string): EventType | undefined => {
    return events.find(event => event.id === id);
  }, [events]);

  return (
    <EventsContext.Provider value={{ events, addEvent, getEventById }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
    const context = React.useContext(EventsContext);
    if (!context) {
      throw new Error('useEvents debe ser usado dentro de un EventsProvider');
    }
    return context;
  };