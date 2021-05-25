import axios from 'axios';
import * as ActionTypes from '../actionTypes/constants.js'

export const addToCart = (prodId, qty) => async (dispatch, getState) =>{
   try {
    console.log(prodId+' is the product Id')
    const {data}= await axios.get('/api/products/'+ prodId );
    //the payload is the data needed to display in cart and is dispatched to cartScreen
    dispatch({
        type: ActionTypes.CART_ADD_ITEM,
        payload:{
            product:data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    //To also save this data in localStorage we use getState in abv function to access state items globally

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

   } catch (error) {
       console.log('error in cartAction '+ error.message)
   }
}


export const removeFromCart =(id) =>(dispatch, getState)=>{

    dispatch({
        type: ActionTypes.CART_DELETE_ITEM,
        payload:id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const cartSaveShipping = (data) =>(dispatch, getState)=>{

    dispatch({
        type: ActionTypes.CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })

    localStorage.setItem('shippingAddress',JSON.stringify(getState().cart.shippingAddress))
}

export const savePaymentMethod = (paymentMethod) => (dispatch,getState) =>{

    dispatch({
        type:ActionTypes.CART_SAVE_PAYMENT_METHOD,
        payload:paymentMethod
    })

    localStorage.setItem('paymentMethod', JSON.stringify(getState().cart.paymentMethod))

}