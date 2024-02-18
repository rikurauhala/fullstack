import { StyleSheet, View } from 'react-native';
import RepositoryItemStatistics from './RepositoryItemStatistics';
import RepositoryItemInformation from './RepositoryItemInformation';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <RepositoryItemInformation repository={repository} />
      <RepositoryItemStatistics repository={repository} />
    </View>
  );
};

export default RepositoryItem;
