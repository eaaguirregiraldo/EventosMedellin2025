// types/event.ts
export interface EventType {
    id: string;
    title: string;
    date: string; // Format YYYY-MM-DD
    time: string; // Format HH:MM
    location: string;
    description: string;
    category: string;
    imageUri: string;
  }
  
  // Para los datos del formulario, antes de añadir el ID
  export type EventFormData = Omit<EventType, 'id'>;