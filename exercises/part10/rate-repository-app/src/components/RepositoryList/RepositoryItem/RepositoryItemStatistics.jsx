import { StyleSheet, View } from 'react-native';
import Text from '../../Text';

const styles = StyleSheet.create({
  statistics: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

const formatNumber = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  }
  return number;
};

const RepositoryItemStatistic = ({ data, text }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text fontWeight="bold">{formatNumber(data)}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

const RepositoryItemStatistics = ({ repository }) => {
  return (
    <View style={styles.statistics}>
      <RepositoryItemStatistic data={repository.stargazersCount} text="Stars" />
      <RepositoryItemStatistic data={repository.forksCount} text="Forks" />
      <RepositoryItemStatistic data={repository.reviewCount} text="Reviews" />
      <RepositoryItemStatistic data={repository.ratingAverage} text="Rating" />
    </View>
  );
};

export default RepositoryItemStatistics;
