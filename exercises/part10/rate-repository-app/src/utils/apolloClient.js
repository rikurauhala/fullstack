import { ApolloClient, InMemoryCache } from '@apollo/client';
import { LOCAL_IP } from '../config';

const createApolloClient = () => {
  return new ApolloClient({
    uri: `http://${LOCAL_IP}:4000/graphql`,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
