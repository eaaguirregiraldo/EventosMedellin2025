// app/(tabs)/add-event.tsx
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import { useEvents } from '../../context/EventsContext'; // Ajusta la ruta si es necesario
import { EventFormData } from '../../types/event';

// Esquema de validación con Yup
const eventSchema = yup.object().shape({
  title: yup.string().required('El título es obligatorio').min(3, 'El título debe tener al menos 3 caracteres'),
  date: yup.string().required('La fecha es obligatoria').matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  time: yup.string().required('La hora es obligatoria').matches(/^\d{2}:\d{2}$/, 'Formato de hora inválido (HH:MM)'),
  location: yup.string().required('La ubicación es obligatoria').min(5, 'La ubicación debe tener al menos 5 caracteres'),
  description: yup.string().required('La descripción es obligatoria').min(10, 'La descripción debe tener al menos 10 caracteres'),
  category: yup.string().required('La categoría es obligatoria'),
  imageUri: yup.string().url('Debe ser una URL válida para la imagen').required('La URL de la imagen es obligatoria (usar https://picsum.photos/seed/nombre/400/200 )'),
});

/**
 * Pantalla con formulario para añadir un nuevo evento.
 * Utiliza React Hook Form para la gestión del formulario y validación.
 */
export default function AddEventFormScreen() {
  const { addEvent } = useEvents();
  const router = useRouter();
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EventFormData>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      category: '',
      imageUri: 'https://picsum.photos/seed/newevent/400/200', // Valor por defecto
    },
  });

  /**
   * Maneja el envío del formulario.
   * @param data Los datos del formulario validados.
   */
  const onSubmit: SubmitHandler<EventFormData> = (data) => {
    try {
      addEvent(data);
      Alert.alert('Éxito', 'Evento añadido correctamente.');
      reset(); // Limpia el formulario
      router.push('/(tabs)/events'); // Navega a la lista de eventos
    } catch (error) {
      console.error("Error al añadir evento:", error);
      Alert.alert('Error', 'No se pudo añadir el evento.');
    }
  };

  // Componente reutilizable para campos de entrada
  const FormInput = ({ name, placeholder, label, control, error,...textInputProps }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.inputField, error? styles.inputError : null]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#999"
            {...textInputProps}
          />
        )}
      />
      {error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <FormInput name="title" label="Título del Evento" placeholder="Ej: Concierto de Rock" control={control} error={errors.title} />
          <FormInput name="date" label="Fecha (YYYY-MM-DD)" placeholder="Ej: 2025-12-31" control={control} error={errors.date} />
          <FormInput name="time" label="Hora (HH:MM)" placeholder="Ej: 20:00" control={control} error={errors.time} />
          <FormInput name="location" label="Ubicación" placeholder="Ej: Estadio Atanasio Girardot" control={control} error={errors.location} />
          <FormInput name="category" label="Categoría" placeholder="Ej: Música, Deporte, Cultura" control={control} error={errors.category} />
          <FormInput name="imageUri" label="URL de la Imagen" placeholder="Ej: https://picsum.photos/seed/myevent/400/200" control={control} error={errors.imageUri} />
          <FormInput name="description" label="Descripción" placeholder="Detalles del evento..." control={control} error={errors.description} multiline numberOfLines={4} />

          <Pressable 
            onPress={handleSubmit(onSubmit)} 
            style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed, // Aplica un estilo adicional si está presionado
            ]}
            disabled={isSubmitting}
            >
            <Text style={styles.submitButtonText}>
                {isSubmitting ? "Guardando..." : "Guardar Evento"}
            </Text>
            </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { // Bloque 1
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: { // Bloque 2
    paddingBottom: 30, // Espacio para el botón al final
  },
  formContainer: { // Bloque 3
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  inputGroup: { // Bloque 4: Agrupa etiqueta y campo
    marginBottom: 18,
  },
  label: { // Bloque 5
    fontSize: 15,
    fontWeight: '500',
    color: '#444',
    marginBottom: 6,
  },
  inputField: { // Bloque 6
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
  },
  inputError: { // Bloque 7: Estilo para campos con error
    borderColor: 'red',
  },
  errorMessage: { // Bloque 8
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: { // Bloque 9
    backgroundColor: 'tomato',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  submitButtonPressed: { // Bloque 10
    backgroundColor: '#e65a41', // Un tono más oscuro al presionar
  },
  submitButtonText: { // Bloque 11
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});