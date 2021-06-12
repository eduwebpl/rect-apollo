import { Card, Tag, Statistic, Button } from 'antd';
import { Link } from 'react-router-dom';

export function Product({title, unitPrice, productId, category}) {
  return (
    <Card title={title}>
      <Tag color="magenta">{category}</Tag>
      <Statistic style={{ marginTop: 8 }} title="Unit Price ($)" value={unitPrice} precision={2} />
      <Button style={{ marginTop: 8 }} type="primary">
        <Link to={`/product/${productId}`}>See Details</Link>
      </Button>
    </Card>
  )
}