import { Pressable, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

const AppBarTab = ({ text, view }) => {
  return (
    <Pressable style={styles.container}>
      <Link to={view}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
