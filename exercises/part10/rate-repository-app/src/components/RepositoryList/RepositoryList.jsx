import { FlatList, StyleSheet, View } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from './RepositoryItem/RepositoryItem';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    display: 'flex',
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(repository) => repository.id}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      style={styles.list}
    />
  );
};

export default RepositoryList;
