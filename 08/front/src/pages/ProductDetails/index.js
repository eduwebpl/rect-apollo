import { useState } from 'react';
import { PageHeader, Descriptions, Button, Divider } from 'antd';
import { OrderForm } from './components/OrderForm';

/*
query GetProductDetails {
    viewer {
      product(filter: {
        productID: 29
      }) {
        productID
        name
        unitPrice
        quantityPerUnit
        category {
          categoryID
          name
        }
        supplier {
          companyName
          contactTitle
          address {
            city
            street
          }
        }
      }
    }
  }
  
1. Get productId from params i.e with useParams hook from react-router-dom
2. Implement useQuery to get product details data
3. Implement loader state
4. Display all the data in view

*/

function ProductDetails() {
  const [orderFormVisible, setOrderFormVisible] = useState(false);

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="My product name"
      />
      <Descriptions title="Product details" bordered>
        <Descriptions.Item label="Category">something</Descriptions.Item>
        <Descriptions.Item label="Unit Price">22$</Descriptions.Item>
        <Descriptions.Item label="Quantity per unit">10 - 10</Descriptions.Item>
        <Descriptions.Item label="Address">
          Company name: New Orleans Cajun Delights, <br />
          Contact title: Order Administrator, <br />
          Address: <br />
          New Orleans, P.O. Box 78934
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Button type="primary" size="large" onClick={() => setOrderFormVisible(true)}>
        Order
      </Button>
      
      <OrderForm
        visible={orderFormVisible}
        productDetails={{
          name: 'My product name',
          productID: 4
        }}
        onClose={() => setOrderFormVisible(false)}
      />
    </>
  )
}

export default ProductDetails;