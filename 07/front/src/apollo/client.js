import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/northwind',
  cache: new InMemoryCache({
    typePolicies: {
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
