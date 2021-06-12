import { Row, Col, Empty, Result, Button, Pagination } from 'antd';
import { Product } from './components/Product';
import { Loader } from '../../components/Loader/Loader'

function ProductsPage() {
  const data = true;
  const loading = false;
  const error = false;
  
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
          <Button type="primary" key="retry">
            Retry
          </Button>
        ]}
      />
    )
  }
  
  return (
    <div>
      {data ? (
        <>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Product
                title="Hello world!"
                unitPrice={1}
                productId={1}
                category="something"
              />
            </Col>
            <Col span={6}>
              <Product
                title="Hello world!"
                unitPrice={1}
                productId={1}
                category="something"
              />
            </Col>
            <Col span={6}>
              <Product
                title="Hello world!"
                unitPrice={1}
                productId={1}
                category="something"
              />
            </Col>
            <Col span={6}>
              <Product
                title="Hello world!"
                unitPrice={1}
                productId={1}
                category="something"
              />
            </Col>
            <Col span={6}>
              <Product
                title="Hello world!"
                unitPrice={1}
                productId={1}
                category="something"
              />
            </Col>
            <Col span={6}>
              <Product
                title="Hello world!"
                unitPrice={1}
                productId={1}
                category="something"
              />
            </Col>
            <Col span={6}>
              <Product
                title="Hello world!"
                unitPrice={1}
                productId={1}
                category="something"
              />
            </Col>
            <Col span={6}>
              <Product
                title="Hello world!"
                unitPrice={1}
                productId={1}
                category="something"
              />
            </Col>
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
