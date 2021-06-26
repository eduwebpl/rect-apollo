import { useState } from 'react';
import { Row, Col, Empty, Result, Button, Pagination } from 'antd';
import {gql, useQuery} from '@apollo/client';
import { Product } from './components/Product';
import { Loader } from '../../components/Loader/Loader';
import {useHistory} from 'react-router-dom';

const PER_PAGE = 8;

const GET_PRODUCTS = gql`
  query GetProducts($perPage: Int, $page: Int) {
    viewer {
      productPagination(page: $page, perPage: $perPage) {
        pageInfo {
          pageCount
          currentPage
        }
        items {
          productID
          name
          unitPrice
          category {
            categoryID
            name
          }
        }
      }
    }
  }
`

function ProductsPage() {
  const history = useHistory();
  const searchParams = new URLSearchParams(window.location.search);
  const pageParam = parseInt(searchParams.get('page'), 10);
  const [page, setPage] = useState(pageParam);
  const {data, loading, error, refetch} = useQuery(GET_PRODUCTS, {
    variables: {
      page,
      perPage: PER_PAGE,
    }
  })
  
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
  
  const {viewer: {productPagination: {items, pageInfo}}} = data;
  const {pageCount, currentPage} = pageInfo;
  
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
            <Pagination pageSize={PER_PAGE} current={currentPage} total={pageCount * PER_PAGE} onChange={(page) => {
              history.push({
                pathname: '/',
                search: `?page=${page}`
              })
              setPage(page);
            }} />
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}

export default ProductsPage;
