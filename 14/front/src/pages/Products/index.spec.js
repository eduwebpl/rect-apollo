import {render, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import ProductsPage from './index';

jest.mock('@apollo/client', () => ({
  gql: () => jest.fn(),
  useQuery: () => ({
    data: {
      viewer: {
        productPagination: {
            pageInfo: {
              pageCount: 10,
              currentPage: 1
            },
            items: [
              {
                __typename: "Product",
                _id: "123",
                productID: 20,
                name: "Hello World",
                unitPrice: "123",
                category: {
                  __typename: "Category",
                  categoryID: 2,
                  name: 'Category 1'
                }
              }
            ] 
          }
        }
      }
  })
}));

describe('ProductList', () => {  
  it ('renders ProductList page', async () => {
    
    const {getByText} = render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsPage />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(getByText('Hello World')).toBeInTheDocument();
      expect(getByText('Category 1')).toBeInTheDocument();
    })
  })
})

