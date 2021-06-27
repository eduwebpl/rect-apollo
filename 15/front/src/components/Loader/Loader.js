import { Spin } from 'antd';
import './Loader.css';

export function Loader() {
  return <div data-testid="loader" className="loader"><Spin /></div>
}