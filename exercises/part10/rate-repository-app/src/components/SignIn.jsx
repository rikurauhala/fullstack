import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
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
  textField: {
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    borderWidth: 1,
    padding: 15,
  },
});

const SignInForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={formik.handleChange('username')}
        style={styles.textField}
        placeholder="Username"
        value={formik.values.username}
      />
      <TextInput
        onChangeText={formik.handleChange('password')}
        secureTextEntry
        style={styles.textField}
        placeholder="Password"
        value={formik.values.password}
      />
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

  return <SignInForm initialValues={initialValues} onSubmit={onSubmit} />;
};

export default SignIn;
