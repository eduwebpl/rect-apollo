import { useState } from 'react';
import { Row, Col, Empty, Result, Button, Pagination } from 'antd';
import {gql, useQuery, useMutation} from '@apollo/client';
import { Product } from './components/Product';
import { Loader } from '../../components/Loader/Loader';
import {useHistory} from 'react-router-dom';
import { BASIC_PRODUCT_FRAGMENT, CATEGORY_FRAGMENT } from '../../apollo/fragments'

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
          _id
          ...BasicProduct
          category {
            ...CategoryFragment
          }
        }
      }
    }
  }

  ${BASIC_PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`

const MUTATION = gql`
  mutation UpdateProduct($productId: Float, $name: String) {
    updateProduct(record: {
      _id: "60c4b18198c36f2c03a90e25",
      productID: $productId,
      name: $name
    }) {
      __typename
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
  
  const [mutate] = useMutation(MUTATION)
  
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
            {items.map(({unitPrice, name, productID, category, _id}) => (
              <Col span={6} key={productID}>
                <Product
                  title={name}
                  unitPrice={unitPrice}
                  productId={productID}
                  category={category.name}
                />
                
                <button onClick={() => {
                  mutate({
                    variables: {
                      _id,
                      productID,
                      name: 'New name'
                    }
                  })
                }}>Order</button>
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
