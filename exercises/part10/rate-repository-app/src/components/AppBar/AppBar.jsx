import Constants from 'expo-constants';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../../theme';

const padding = 20;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBar,
    padding: padding,
    paddingTop: Constants.statusBarHeight + padding,
  },
});

const AppBar = () => {
  const views = [
    {
      key: 'repositories',
      text: 'Repositories',
      view: '/repositories',
    },
    {
      key: 'signin',
      text: 'Sign in',
      view: '/signin',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        {views.map((view) => (
          <AppBarTab key={view.key} text={view.text} view={view.view} />
        ))}
      </ScrollView>
    </View>
  );
};

export default AppBar;
