
import * as ActionTypes from '../actionTypes/constants';

const inititalState={
    cartItems:[ ],
    shippingAddress:{}
}

export const cartReducer = (state = inititalState, action) =>{
    switch (action.type) {
        case ActionTypes.CART_ADD_ITEM:
            
            const item = action.payload;
            const itemExists = state.cartItems.find((itm) => itm.product === item.product)
            if(itemExists){
                return{
                    ...state,
                    cartItems: state.cartItems.map( itm => itm.product=== itemExists.product ? item : itm )
                }
            }else{
                return{
                    ...state, 
                    cartItems:[...state.cartItems, item]
                }
            }
        case ActionTypes.CART_DELETE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(itm => itm.product !== action.payload)
            }
        case ActionTypes.CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case ActionTypes.CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload
            }
        case ActionTypes.CART_CLEAR_ITEMS:
            return {
              ...state,
              cartItems: [],
            }
        default:
            return state
    }
}