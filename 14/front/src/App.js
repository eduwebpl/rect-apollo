import './App.css';
import {LayoutApp} from './components/layout/Layout'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProductsPage from './pages/Products';
import ProductDetails from './pages/ProductDetails'

function App() {  
  return (
    <Router>
      <Switch>
        <Route path="/product/:productId">
          <LayoutApp>
            <ProductDetails />
          </LayoutApp>
        </Route>
        <Route path="/">
          <LayoutApp>
            <ProductsPage />
          </LayoutApp>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
