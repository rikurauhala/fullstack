import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    gap: 20,
  },
  signInButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 20,
  },
  textInput: {
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    borderWidth: 1,
    padding: 15,
  },
  textInputContainer: {
    gap: 5,
  },
});

const SignInForm = ({ initialValues, onSubmit, validationSchema }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const usernameHasErrors = formik.touched.username && formik.errors.username;
  const passwordHasErrors = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          onChangeText={formik.handleChange('username')}
          style={
            usernameHasErrors
              ? { ...styles.textInput, borderColor: theme.colors.error }
              : styles.textInput
          }
          placeholder="Username"
          value={formik.values.username}
        />
        {usernameHasErrors && (
          <Text color="error">{formik.errors.username}</Text>
        )}
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          onChangeText={formik.handleChange('password')}
          secureTextEntry
          style={
            passwordHasErrors
              ? { ...styles.textInput, borderColor: theme.colors.error }
              : styles.textInput
          }
          placeholder="Password"
          value={formik.values.password}
        />
        {passwordHasErrors && (
          <Text color="error">{formik.errors.password}</Text>
        )}
      </View>
      <Pressable onPress={formik.handleSubmit} style={styles.signInButton}>
        <Text color="light">Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;
    console.log(`username: ${username}, password: ${password}`);
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  return (
    <SignInForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

export default SignIn;
