import { Modal, Button, Result, Form, Input } from 'antd';
import { SmileOutlined, CloseCircleOutlined } from '@ant-design/icons';


export function OrderForm({ visible, onClose, productDetails }) {
  const isOrdered = false;
  const isError = false;
  const isFormState = !isOrdered && !isError;

  const { name } = productDetails;
  
  const handleCancel = () => onClose();
  
  const handleSubmit = (values) => {
    console.log(values)
  };

  return (
    <Modal
      visible={visible}
      title={`Order ${name}`}
      onOk={handleSubmit}
      onCancel={handleCancel}
      footer={isFormState ? [
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>
      ] : []}
    >
      {
        isFormState && (
          <Form
            name="normal_login"
            className="login-form"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input placeholder="Street" />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: 'Please input your City!' }]}
            >
              <Input
                placeholder="City"
              />
            </Form.Item>
            <Form.Item
              name="postalCode"
              rules={[{ required: true, message: 'Please input your Postal Code!' }]}
            >
              <Input
                placeholder="Postal Code"
              />
            </Form.Item>
            <Form.Item
              name="country"
              rules={[{ required: true, message: 'Please input your Country!' }]}
            >
              <Input
                placeholder="Country"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )
      }
      {
        isOrdered && (
          <Result
            icon={<SmileOutlined />}
            title="Great, your order is on the way!"
            extra={<Button type="primary" onClick={handleCancel}>Back to product</Button>}
          />
        )
      }
      {
        isError && (
          <Result
            status="error"
            icon={<CloseCircleOutlined />}
            title="Something went wrong!"
            subTitle="Please try again or contact with support!"
            extra={<Button type="primary" onClick={handleCancel}>Back to product</Button>}
          />
        )
      }
    </Modal>
  )
}