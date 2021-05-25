import axios from 'axios';
import * as ActionTypes from '../actionTypes/constants';

const createOrder = ( order ) => async ( dispatch, getState ) =>{
   try {
        dispatch({
            type: ActionTypes.ORDER_CREATE_REQUEST
        })

        const { userLogin: {userInfo}} = getState()

        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post('/api/orders', order, config)


        dispatch({
            type:ActionTypes.ORDER_CREATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: ActionTypes.CART_CLEAR_ITEMS,
            payload: data,
        })
        
        localStorage.removeItem('cartItems')

   } catch (error) {
       dispatch({
            type:ActionTypes.ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
       })
   }
}

const getOrder = ( orderId ) => async ( dispatch, getState ) =>{
    try {
         dispatch({
             type: ActionTypes.ORDER_DETAILS_REQUEST
         })
 
         const { userLogin: {userInfo} } = getState()
 
         const config = {
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`,
             },
         }
 
         const { data } = await axios.get('/api/orders/'+orderId , config)
 
         dispatch({
             type:ActionTypes.ORDER_DETAILS_SUCCESS,
             payload: data
         })
 
    } catch (error) {
        dispatch({
             type:ActionTypes.ORDER_DETAILS_FAIL,
             payload: error.response && error.response.data.message
                      ? error.response.data.message 
                      : error.message
        })
    }
}

const payOrder = ( orderId, paymentResult ) => async ( dispatch, getState ) =>{
    try {
         dispatch({
             type: ActionTypes.ORDER_PAY_REQUEST
         })
 
         const { userLogin: {userInfo} } = getState()
 
         const config = {
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`,
             },
         }
         
         //updating the user
         const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
 
         dispatch({
             type:ActionTypes.ORDER_PAY_SUCCESS,
             payload: data
         })
 
    } catch (error) {
        dispatch({
             type:ActionTypes.ORDER_PAY_FAIL,
             payload: error.response && error.response.data.message
                      ? error.response.data.message 
                      : error.message
        })
    }
}

const fetchOrders = () => async( dispatch, getState) => {
    try {   
        dispatch({
            type: ActionTypes.ORDERS_FETCH_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch(
            {
                type:ActionTypes.ORDERS_FETCH_SUCCESS,
                payload: data
            }
        );

    } catch (error) {
        dispatch({
            type:ActionTypes.ORDERS_FETCH_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
       })
    }
}

const adminOrders = (pageNumber='') => async (dispatch, getState) => {
    try {

        dispatch({
            type:ActionTypes.ORDERS_LIST_REQUEST
        })


        const { userLogin: {userInfo}} = getState();


        const config ={
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // if object returns our array under data directly destructure it here
        const { data } = await axios.get(`/api/orders?pageNumber=${pageNumber}`, config);

        dispatch({
            type:ActionTypes.ORDERS_LIST_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:ActionTypes.ORDERS_LIST_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
       })
    }
}

const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type:ActionTypes.ORDER_DELIVER_REQUEST
        })

        const { userLogin:{ userInfo} } = getState();

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = axios.put(`/api/orders/${order._id}/deliver`, order, config);

        dispatch({
            type: ActionTypes.ORDER_DELIVER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:ActionTypes.ORDERS_LIST_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
       })
    }
}
export {createOrder , getOrder, payOrder, fetchOrders,adminOrders, deliverOrder}