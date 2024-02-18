import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import AppBarTab from './AppBarTab';

const padding = 20;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24292e',
    padding: padding,
    paddingTop: Constants.statusBarHeight + padding,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text="Repositories" />
    </View>
  );
};

export default AppBar;
