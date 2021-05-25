import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import CartScreen from './screens/CartScreen'
import NotFound from './screens/NotFound.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import usersListScreen from "./screens/usersListScreen";
import ProductsListScreen from "./screens/ProductsListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";
import OrdersListScreen from "./screens/OrdersListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/Login" component={LoginScreen}/>
          <Route path="/register" component ={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component ={ PlaceOrderScreen}/>
          <Route path='/order/:id?' component ={ OrderScreen}/>
          <Route path='/admin/userslist' component ={ usersListScreen}/>
          <Route path='/admin/productslist' component ={ ProductsListScreen} exact/>
          <Route path='/admin/productslist/page/:pageNumber' component ={ ProductsListScreen} exact/>
          <Route path='/admin/orderslist' component ={ OrdersListScreen} exact/>
          <Route path='/admin/orderslist/page/:pageNumber' component ={ OrdersListScreen} exact/>
          <Route path='/admin/user/:id/Edit' component ={ UserEditScreen}/>
          <Route path='/admin/products/create' component ={ ProductCreateScreen}/>
          <Route path='/admin/product/:id/Edit' component ={ ProductEditScreen}/>
          <Route path="/search/:keyword" component={HomeScreen} exact/>
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
