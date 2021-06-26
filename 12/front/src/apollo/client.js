import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/northwind',
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/northwind'
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          viewer: {
            merge: (existing = {}, incoming = {}) => {
              return {...existing, ...incoming};
            }
          }
        }
      },
      ProductPagination: {
        keyFields: ['pageInfo']
      },
      Product: {
        keyFields: ['productID']
      },
      Category: {
        keyFields: ['categoryID', 'name'],
        fields: {
          name(cachedName) {
            return cachedName.toUpperCase();
          }
        }
      }
    }
  })
});
