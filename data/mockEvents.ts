// data/mockEvents.ts
import { EventType } from '../types/event';

// Exportado como 'let' para permitir la modificación si no se usa Context para actualizarlo directamente.
// Sin embargo, con Context, esta exportación directa no se modifica; el estado se maneja en el Context.
export const INITIAL_MOCK_EVENTS: EventType[] =[
    {
      id: '1',
      title: 'Conferencia de Tecnología',
      date: '2025-06-15',
      time: '09:00',
      location: 'Centro de Convenciones de Medellín',
      description: 'Una conferencia sobre las últimas tendencias en tecnología.',
      category: 'Tecnología',
      imageUri: 'https://minciencias.gov.co/sites/default/files/informe_ia_cilac.jpg',
    },
    {
      id: '2',
      title: 'Concierto de Andrés Calamaro',
      date: '2025-07-20',
      time: '18:00',
      location: 'La Macarena',
      description: 'Desde Argentina Andrés Calamaro en vivo en Medellin.',
      category: 'Música',
      imageUri: 'https://media.taquillalive.com/viva/TCL-EVN716/event_detail_code/TCL-EVN716.webp',
    },
    {
      id: '3',
      title: 'Exposición de Arte',
      date: '2025-08-05',
      time: '10:00',
      location: 'Galería de Arte Moderna',
      description: 'Exposición de artistas contemporáneos.',
      category: 'Arte',
      imageUri: 'https://img.lalr.co/cms/2022/03/31124833/COLP_EXT_106936_553dc-1.jpg',
    },
    {
      id: '4',
      title: 'Maratón Anual',
      date: '2025-09-10',
      time: '07:00',
      location: 'Avenida Principal',
      description: 'Participa en la maratón anual de la ciudad.',
      category: 'Deportes',
      imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Marat%C3%B3n_Medell%C3%ADn_2019.jpg/250px-Marat%C3%B3n_Medell%C3%ADn_2019.jpg',
    },
    {
      id: '5',
      title: 'Taller de Fotografía',
      date: '2025-10-22',
      time: '14:00',
      location: 'Centro Cultural',
      description: 'Aprende técnicas avanzadas de fotografía.',
      category: 'Educación',
      imageUri: 'https://www.articaonline.com/wp-content/uploads/2017/07/Flyer-taller-fotograf%C3%ADa-experimental-768x644.jpg',
    },
  ];