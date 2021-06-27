import { useState } from 'react';
import { PageHeader, Descriptions, Button, Divider } from 'antd';
import { useParams } from 'react-router-dom';
import { OrderForm } from './components/OrderForm';
import { gql, useQuery } from '@apollo/client';
import { Loader } from '../../components/Loader/Loader';
import { BASIC_PRODUCT_FRAGMENT, CATEGORY_FRAGMENT } from '../../apollo/fragments'
 
const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($productId: Float) {
    viewer {
      product(filter: {
        productID: $productId
      }) {
        ...BasicProduct
        quantityPerUnit
        category {
          ...CategoryFragment
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

  ${BASIC_PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`

function ProductDetails() {
  const {productId} = useParams();
  
  const {data, loading} = useQuery(GET_PRODUCT_DETAILS, {
    variables: {
      productId: parseInt(productId)
    }
  });
  
  const [orderFormVisible, setOrderFormVisible] = useState(false);
  
  if (loading) {
    return <Loader />
  }
  
  const {viewer: {product: {name, unitPrice, quantityPerUnit, category, supplier, productID}}} = data;
  const {contactName, contactTitle, address} = supplier;

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title={name}
      />
      <Descriptions title="Product details" bordered>
        <Descriptions.Item label="Category">{category.name}</Descriptions.Item>
        <Descriptions.Item label="Unit Price">{unitPrice}$</Descriptions.Item>
        <Descriptions.Item label="Quantity per unit">{quantityPerUnit}</Descriptions.Item>
        <Descriptions.Item label="Address">
          Company name: {contactName}, <br />
          Contact title: {contactTitle}, <br />
          Address: <br />
          {address.city}, {address.street}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Button type="primary" size="large" onClick={() => setOrderFormVisible(true)}>
        Order
      </Button>
      
      <OrderForm
        visible={orderFormVisible}
        productDetails={{
          name,
          productID
        }}
        onClose={() => setOrderFormVisible(false)}
      />
    </>
  )
}

export default ProductDetails;