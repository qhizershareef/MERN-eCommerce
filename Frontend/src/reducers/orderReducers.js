import * as ActionTypes from '../actionTypes/constants';
const orderCreateReducer = (state = {}, action)=>{
    switch (action.type) {
        case ActionTypes.ORDER_CREATE_REQUEST:
            return { loading: true};
        case ActionTypes.ORDER_CREATE_SUCCESS:
            return { loading: false, order:action.payload, success:true}
        case ActionTypes.ORDER_CREATE_FAIL:
            return { loading:false, error:action.payload }
        default:
            return state;
    }
}

const orderDetailsReducer = (state = { loading:true,  orderItems:[], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ActionTypes.ORDER_DETAILS_REQUEST:
            return { ...state, loading: true}
        case ActionTypes.ORDER_DETAILS_SUCCESS:
            return{ loading:false, order: action.payload }
        case ActionTypes.ORDER_DETAILS_FAIL:
            return{ loading: false, error:action.payload}
        default:
            return state;
    }
}
const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.ORDER_PAY_REQUEST:
            return {loading: true}
        case ActionTypes.ORDER_PAY_SUCCESS:
            return {loading:false, success:true}
        case ActionTypes.ORDER_PAY_FAIL:
            return { loading: false, error: action.payload}
        case ActionTypes.ORDER_PAY_RESET:
            return {}
        default:
            return state;
    }
}

const fetchOrdersReducer = (state={ orders:[]}, action) =>{
    switch (action.type) {
        case ActionTypes.ORDERS_FETCH_REQUEST:
            return {loading:true}
        case ActionTypes.ORDERS_FETCH_SUCCESS:
            return { loading:false, orders: action.payload}
        case ActionTypes.ORDERS_FETCH_FAIL:
            return { loading:false, error: action.payload}
        case ActionTypes.ORDERS_FETCH_RESET:
            return {orders:[]}
        default:
            return state;
    }
}


const getAllOrdersReducer = (state = {orders:[] },action) => {
    switch (action.type) {
        case ActionTypes.ORDERS_LIST_REQUEST:
            return { loading: true}
        case ActionTypes.ORDERS_LIST_SUCCESS:
            return { loading: false, orders:action.payload.orders, pages: action.payload.pages, page: action.payload.page}
        case ActionTypes.ORDERS_LIST_FAIL:
            return { loading:false, error:action.payload }
        case ActionTypes.ORDERS_LIST_RESET:
            return { orders:[] }
        default:
            return state;
    }
}

const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.ORDER_DELIVER_REQUEST:
            return { loading: true}
        case ActionTypes.ORDER_DELIVER_SUCCESS:
            return { loading:false, success:true}
        case ActionTypes.ORDER_DELIVER_FAIL:
            return { loading: false, error: action.payload}
        case ActionTypes.ORDER_DELIVER_RESET:
            return {}
        default:
            return state;
    }
}

export {orderCreateReducer, orderDetailsReducer, orderPayReducer, fetchOrdersReducer, getAllOrdersReducer, orderDeliverReducer }
