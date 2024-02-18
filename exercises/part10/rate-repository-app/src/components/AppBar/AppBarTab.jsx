import { Pressable, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
