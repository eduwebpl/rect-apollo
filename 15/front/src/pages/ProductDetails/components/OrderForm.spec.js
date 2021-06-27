import {render, waitFor, fireEvent} from '@testing-library/react';
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
    
    const {getByPlaceholderText, getByText} = render(
      <MockedProvider mocks={mocks}>
         <OrderForm visible={true} productDetails={{}} onClose={jest.fn()} orderRandomId={orderRandomId} />
      </MockedProvider>
    );
    
    fireEvent.change(getByPlaceholderText('Street'), { target: { value: 'Sosnowa' }})
    fireEvent.change(getByPlaceholderText('City'), { target: { value: 'Krakow' }})
    fireEvent.change(getByPlaceholderText('Country'), { target: { value: 'Polska' }})
    fireEvent.change(getByPlaceholderText('Postal Code'), { target: { value: '31-333' }})
    
    fireEvent.click(getByText('Submit'))
    
    await waitFor(() => {
      // assertion here
      expect(getByText('Great, your order is on the way!')).toBeInTheDocument();
    })
  })
})

