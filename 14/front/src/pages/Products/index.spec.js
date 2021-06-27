import {render, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import ProductsPage, { GET_PRODUCTS } from './index';

describe('ProductList', () => {  
  it ('renders ProductList page', async () => {
    
    const mocks = [
      {
        request: {
          query: GET_PRODUCTS,
          variables: {
            page: 1,
            perPage: 8,
          }
        },
        result: {
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
        },
      },
    ]
    
    const {getByText, queryByTestId} = render(
      <MemoryRouter initialEntries={["/"]}>
        <MockedProvider mocks={mocks}>
         <ProductsPage />
        </MockedProvider>
      </MemoryRouter>
    );
    
    expect(queryByTestId('loader')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(getByText('Hello World')).toBeInTheDocument();
      expect(getByText('Category 1')).toBeInTheDocument();
      expect(queryByTestId('loader')).not.toBeInTheDocument();
    })
  })
  
  it ('renders error state', async () => {
    
    const mocks = [
      {
        request: {
          query: GET_PRODUCTS,
          variables: {
            page: 1,
            perPage: 8,
          }
        },
        error: new Error('Error!')
      },
    ]
    
    const {getByText, queryByText} = render(
      <MemoryRouter initialEntries={["/"]}>
        <MockedProvider mocks={mocks}>
         <ProductsPage />
        </MockedProvider>
      </MemoryRouter>
    );
  
    expect(queryByText('Retry')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(getByText('Retry')).toBeInTheDocument();
    })
  })  
})

