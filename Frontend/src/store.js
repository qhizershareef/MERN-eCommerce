import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createProductReducer, createReviewReducer, deleteProductReducer, productDetailsReducer, productsListReducer, topProductsReducer, updateProductReducer, updateProductStockCountReducer} from './reducers/productReducers';
import thunk  from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { deleteUserReducer, updateUserReducer, userDetailsReducer, userLoginReducer, userProfileUpdateReducer, userRegisterReducer, usersListReducer } from './reducers/userReducers';
import { fetchOrdersReducer, getAllOrdersReducer, orderCreateReducer,orderDetailsReducer, orderPayReducer, orderDeliverReducer } from './reducers/orderReducers';

const reducer= combineReducers({
   productsList: productsListReducer,
   productDetails: productDetailsReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userDetails : userDetailsReducer,
   userProfileUpdate: userProfileUpdateReducer,
   orderCreate: orderCreateReducer,
   orderDetails: orderDetailsReducer,
   orderPay : orderPayReducer,
   fetchOrders: fetchOrdersReducer,
   usersList: usersListReducer,
   deleteUser: deleteUserReducer,
   updateUser:updateUserReducer,
   deleteProduct: deleteProductReducer,
   createProduct : createProductReducer,
   updateProduct:updateProductReducer,
   getAllOrders: getAllOrdersReducer,
   orderDeliver: orderDeliverReducer,
   updateProductStockCount:updateProductStockCountReducer,
   createReview:createReviewReducer,
   topProducts: topProductsReducer
})

const cartItemsFromLocal = localStorage.getItem('cartItems');

const userInfoFromLocal = localStorage.getItem('userInfo');

const cartItems = cartItemsFromLocal ? JSON.parse(cartItemsFromLocal) : []

const userInfo = userInfoFromLocal ? JSON.parse(userInfoFromLocal): null;

const shippingAddressFromLocal = localStorage.getItem('shippingAddress');

const shippingAddress = shippingAddressFromLocal ? JSON.parse(shippingAddressFromLocal): {};

const paymentMethodFromLocal = localStorage.getItem('paymentMethod');

const paymentMethod = paymentMethodFromLocal? JSON.parse(paymentMethodFromLocal): {}

const initialState= {
    cart: {
        cartItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod
    },
    userLogin:{
        userInfo: userInfo
    }
}

const middleware=[thunk]

const store= createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;