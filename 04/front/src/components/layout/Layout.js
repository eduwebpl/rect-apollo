import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from "react-router-dom";
import './Layout.css';

const { Header, Content, Footer } = Layout;

export function LayoutApp({ children }) {
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