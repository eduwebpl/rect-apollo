import {useState} from 'react';
import { Modal, Button, Result, Form, Input } from 'antd';
import { SmileOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {useMutation, gql} from '@apollo/client';
import {generateRandomId} from '../../../utils/generateRandomId'

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($orderID: Float, $street: String, $postalCode: String, $country: String, $city: String) {
    createOrder(record: {
      orderID: $orderID,
      shipAddress: {
        street: $street,
        city: $city,
        postalCode: $postalCode,
        country: $country,
      }
    }) {
      __typename
    }
  }
`;

export function OrderForm({ visible, onClose, productDetails, orderRandomId = generateRandomId() }) {
  const [isOrdered, setIsOrdered] = useState(false);
  const [isError, setIsError] = useState(false)
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: () => {
      setIsOrdered(true)
    },
    onError: () => {
      setIsError(true)
    }
  });
  const isFormState = !isOrdered && !isError;

  const { name } = productDetails;
  
  const handleCancel = () => {
    onClose();
    setIsOrdered(false)
    setIsError(false)
  };
  
  const handleSubmit = (values) => {
    if (!values) {
      return;
    } 
    
    const {postalCode, street, country, city} = values;

    createOrder({
      variables: {
        orderID: orderRandomId,
        postalCode,
        street,
        country,
        city
      }
    })
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
              name="street"
              rules={[{ required: true, message: 'Please input your street!' }]}
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
              <Button type="submit" htmlType="submit">
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