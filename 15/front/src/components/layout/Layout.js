import { useEffect } from 'react';
import { Layout, Menu, Breadcrumb, notification } from 'antd';
import { Link } from "react-router-dom";
import { useSubscription, gql } from '@apollo/client';
import './Layout.css';

const { Header, Content, Footer } = Layout;

const SUBSCRIBE_CREATED_ORDER = gql`
  subscription {
    orderCreated {
      orderID
      shipAddress {
        street
        city
      }
    }
  }
`

export function LayoutApp({ children }) {
  const {data} = useSubscription(SUBSCRIBE_CREATED_ORDER)
  // notification.open({message: 'Hello', description: 'desc!!'})
  
  useEffect(() => {
    if (data) {
      const {orderCreated: {orderID, shipAddress: {street, city}}} = data;
      
      notification.open({
        message: `New order created! #${orderID}`,
        description: `Street ${street}, City: ${city}`
      })
    }
  }, [data])
  
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">Super Shop!</div>
        <Menu theme="dark" mode="horizontal" selectable={false}>
          <Menu.Item><Link to="/">All Products</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        </Breadcrumb>
        <div className="site-layout-content">
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Super Shop App 2021</Footer>
    </Layout>
  )
}