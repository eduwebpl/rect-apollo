import { Row, Col, Empty, Result, Button, Pagination } from 'antd';
import {gql, useQuery} from '@apollo/client';
import { Product } from './components/Product';
import { Loader } from '../../components/Loader/Loader'

const GET_PRODUCTS = gql`
  query GetProducts {
    viewer {
      productPagination(page: 0, perPage: 8) {
        items {
          productID
          name
          unitPrice
          category {
            name
          }
        }
      }
    }
  }
`

function ProductsPage() {
  const {data, loading, error, refetch} = useQuery(GET_PRODUCTS)
  
  if (loading) {
    return <Loader />
  }
  
  if (error) {
    return (
      <Result
        status="500"
        title="Something went wrong..."
        subTitle="Please try again or contact with support."
        extra={[
          <Button type="primary" key="retry" onClick={() => refetch()}>
            Retry
          </Button>
        ]}
      />
    )
  }
  
  const {viewer: {productPagination: {items}}} = data;
  
  return (
    <div>
      {data ? (
        <>
          <Row gutter={[16, 16]}>
            {items.map(({unitPrice, name, productID, category}) => (
              <Col span={6} key={productID}>
                <Product
                  title={name}
                  unitPrice={unitPrice}
                  productId={productID}
                  category={category.name}
                />
              </Col>
            ))}
          </Row>
          
          <div style={{textAlign: 'center', marginTop: '16px'}}>
            <Pagination pageSize={8} current={1} total={50} />
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}

export default ProductsPage;
