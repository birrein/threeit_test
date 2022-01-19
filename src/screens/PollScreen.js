import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import {MUSIC_GENRES} from '../utils/constants';
import {insertPoll, getPollsByEmail} from '../api/MusicPoll';

const Poll = () => {
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      musicGenre: '',
      email: '',
    },
    validationSchema: Yup.object({
      musicGenre: Yup.string().required('Debe ingresar estilo musical.'),
      email: Yup.string()
        .email('El correo ingresado no es válido.')
        .required('Debe ingresar un email.'),
    }),
    validateOnChange: false,
    onSubmit: async formValues => {
      setError(false);
      try {
        let res = await getPollsByEmail(formValues.email);
        if (res.length > 0) {
          setError('Ya has participado en esta encuesta.');
          return;
        }

        res = await insertPoll(formValues);
        if (res === 'Encuesta guardada.') {
          Alert.alert('Encuesta guardada', 'Gracias por participar');
          formik.setFieldValue('musicGenre', '');
          formik.setFieldValue('email', '');
        } else {
          setError('Error al enviar encuesta.');
        }
      } catch (error) {
        setError('Error al enviar encuesta.');
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encuesta 3it</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={formik.values.musicGenre}
          onValueChange={text => formik.setFieldValue('musicGenre', text)}>
          <Picker.Item
            label="Seleccione estilo musical"
            value=""
            style={{color: '#999'}}
          />
          {MUSIC_GENRES.map(genre => (
            <Picker.Item label={genre} value={genre} key={genre} />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.email}
        onChangeText={text => formik.setFieldValue('email', text)}
        autoComplete="email"
        keyboardType="email-address"
      />
      <View style={styles.btnContainer}>
        <Button title="Ingresar" onPress={formik.handleSubmit} />
      </View>
      {formik.errors.musicGenre && (
        <Text style={styles.error}>{formik.errors.musicGenre}</Text>
      )}
      {formik.errors.email && (
        <Text style={styles.error}>{formik.errors.email}</Text>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Poll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  picker: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 0,
    borderRadius: 10,
  },
  input: {
    height: 50,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#333',
  },
  btnContainer: {
    marginVertical: 12,
  },
  error: {
    textAlign: 'center',
    color: '#f00',
    marginTop: 20,
  },
});
