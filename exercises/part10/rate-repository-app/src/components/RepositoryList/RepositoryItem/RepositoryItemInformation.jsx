import { Image, StyleSheet, View } from 'react-native';
import theme from '../../../theme';
import Text from '../../Text';

const styles = StyleSheet.create({
  image: {
    borderRadius: 5,
    width: 50,
    height: 50,
  },
  informationContainer: {
    flexDirection: 'row',
  },
  informationDescription: {
    flex: 1,
    flexWrap: 'wrap',
  },
  informationLanguage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 6,
  },
  informationTextContainer: {
    flexDirection: 'column',
    flexShrink: 1,
    gap: 5,
    paddingLeft: 15,
  },
});

const RepositoryItemInformation = ({ repository }) => {
  return (
    <View style={styles.informationContainer}>
      <Image
        style={styles.image}
        source={{
          uri: repository.ownerAvatarUrl,
        }}
      />
      <View style={styles.informationTextContainer}>
        <Text fontSize="subheading" fontWeight="bold">
          {repository.fullName}
        </Text>
        <Text color="textSecondary">{repository.description}</Text>
        <View style={styles.informationLanguage}>
          <Text color="light">{repository.language}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItemInformation;
