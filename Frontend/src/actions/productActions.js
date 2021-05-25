import * as ActionTypes from '../actionTypes/constants';
import axios from 'axios'

//using redux thunk adding function inside another function
const listProducts = ( keyword='', pageNumber='' ) => async (dispatch) => {
    try {
        //1st dispatch is request 
        dispatch({ type: ActionTypes.PRODUCT_LIST_REQUEST})
        //querying for search based keywords or null
        const {data}= await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        
        //2nd dispatch is for success and error is handled in catch block
        dispatch({
            type: ActionTypes.PROUDUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.PROUDUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                         ? error.response.data.message 
                         : error.message
        })
    }
}

const listProductDetails = (id) => async (dispatch) => {
    try {
        console.log(id+ 'is id')
        //1st dispatch is request 
        dispatch({ type: ActionTypes.PRODUCT_DETAILS_REQUEST})
        
        const {data}= await axios.get('/api/products/'+ id );
        
        //2nd dispatch is for success and error is handled in catch block
        dispatch({
            type: ActionTypes.PROUDUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.PROUDUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                         ? error.response.data.message 
                         : error.message
        })
    }
}
//to get the same error message as of server check error.response

const deleteProduct = (id) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type:ActionTypes.PRODUCT_DELETE_REQUEST
        });

        const { userLogin:{userInfo} } = getState();

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/admin/${id}`, config);
        
        dispatch({
            type: ActionTypes.PRODUCT_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type:ActionTypes.PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
        })
    }
}

const updateProduct = ( product ) => async (dispatch , getState) =>{
    try {
        dispatch({
            type:ActionTypes.PRODUCT_UPDATE_REQUEST
        });

        const { userLogin:{userInfo} } = getState();

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put( `/api/products/admin/${product._id}`, product, config );
        
        dispatch({
            type: ActionTypes.PRODUCT_UPDATE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: ActionTypes.PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
        })
    }
}

const createProduct = (product) => async (dispatch, getState)=>{
    
    try {
        dispatch({
            type: ActionTypes.PRODUCT_CREATE_REQUEST
        })

        const { userLogin:{userInfo} } = getState();
        console.log(userInfo.token)
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/products/admin', product, config );

        dispatch({
            type: ActionTypes.PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ActionTypes.PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
        })
    }
}

const updateProductStockCount = ( Item ) => async(dispatch,getState)=>{

    try {
        dispatch({
            type: ActionTypes.PRODUCT_UPDATECOUNT_REQUEST
        })

        const { userLogin:{userInfo} } = getState();
        console.log(userInfo.token)
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put('/api/products/' + Item.product, {qty:Item.qty}, config );

        dispatch({
            type: ActionTypes.PRODUCT_UPDATECOUNT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ActionTypes.PRODUCT_UPDATECOUNT_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
        })
    }
}


const createReview = ( Review, id ) => async(dispatch,getState)=>{

    try {
        dispatch({
            type: ActionTypes.PRODUCT_CREATE_REVIEW_REQUEST
        })

        const { userLogin:{userInfo} } = getState();

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        await axios.post('/api/products/'+id+'/review', Review, config );

        dispatch({
            type: ActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: ActionTypes.PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
        })
    }
}

const listTopProducts = () => async (dispatch) => {
    try {
        //1st dispatch is request 
        dispatch({ type: ActionTypes.TOP_PRODUCTS_REQUEST})
        //querying for search based keywords or null
        const {data}= await axios.get(`/api/products/top`);
        
        //2nd dispatch is for success and error is handled in catch block
        dispatch({
            type: ActionTypes.TOP_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.TOP_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message 
                        : error.message
        })
    }
}

export { listProducts, listProductDetails, deleteProduct, updateProduct, createProduct, updateProductStockCount, createReview, listTopProducts};