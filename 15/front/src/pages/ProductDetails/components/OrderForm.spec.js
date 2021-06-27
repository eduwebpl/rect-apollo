import {render, waitFor} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { OrderForm, CREATE_ORDER_MUTATION } from './OrderForm';
import {generateRandomId} from '../../../utils/generateRandomId'

describe('OrderForm', () => {  
  it ('renders OrderForm page and execute mutation', async () => {
    const orderRandomId = generateRandomId();
    const mocks = [
      {
        request: {
          query: CREATE_ORDER_MUTATION,
          variables: {
            orderID: orderRandomId,
            postalCode: '31-333',
            street: 'Sosnowa',
            country: 'Polska',
            city: 'Krakow'
          }
        },
        result: {
          data: {},
        },
      }
    ]
    
    render(
      <MockedProvider mocks={mocks}>
         <OrderForm visible={true} productDetails={{}} onClose={jest.fn()} orderRandomId={orderRandomId} />
      </MockedProvider>
    );
    
    
    await waitFor(() => {
      // assertion here
    })
  })
})

