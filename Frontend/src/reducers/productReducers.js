
import { updateProductStockCount } from '../actions/productActions';
import  * as ActionTypes  from '../actionTypes/constants';

const productsListReducer = ( state= { products:[] }, action ) => { 
    switch (action.type){
        case ActionTypes.PRODUCT_LIST_REQUEST:
            return { loading: true , products:[] }
        case ActionTypes.PROUDUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products, pages: action.payload.pages, page: action.payload.page}
        case ActionTypes.PROUDUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

const productDetailsReducer = (state={ product:{ reviews: [] } }, action) =>{
    switch(action.type){
        case ActionTypes.PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state}
        case ActionTypes.PROUDUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case ActionTypes.PROUDUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }

}

const deleteProductReducer = ( state = { } , action ) =>{
    switch(action.type) {
        case ActionTypes.PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case ActionTypes.PRODUCT_DELETE_SUCCESS:
            return { loading:false, success:true};
        case ActionTypes.PRODUCT_DELETE_FAIL:
            return { loading:true, error: action.payload};
        case ActionTypes.PRODUCT_DELETE_RESET:
            return {};
        default:
            return state;
    }
}
const createProductReducer = (state = { },action)=>{
    switch(action.type){
        case ActionTypes.PRODUCT_CREATE_REQUEST:
            return { loading:true}
        case ActionTypes.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success:true, product: action.payload}
        case ActionTypes.PRODUCT_CREATE_FAIL:
            return { loading:false, error: action.payload}
        default:
            return state
    }
}
const updateProductReducer = ( state = {}, action )=>{
    switch (action.type) {
        case ActionTypes.PRODUCT_UPDATE_REQUEST:
            return {loading:true};
        case ActionTypes.PRODUCT_UPDATE_SUCCESS:
            return { loading:false , success:true}
        case ActionTypes.PRODUCT_UPDATE_FAIL:
            return { loading:false, error: action.payload};
        case ActionTypes.PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}

const updateProductStockCountReducer = ( state = {}, action )=>{
    switch (action.type) {
        case ActionTypes.PRODUCT_UPDATECOUNT_REQUEST:
            return {loading:true};
        case ActionTypes.PRODUCT_UPDATECOUNT_SUCCESS:
            return { loading:false , success:true, product:action.payload}
        case ActionTypes.PRODUCT_UPDATECOUNT_FAIL:
            return { loading:false, error: action.payload};
        case ActionTypes.PRODUCT_UPDATECOUNT_RESET:
            return {}
        default:
            return state;
    }
}

const createReviewReducer = ( state = { }, action )=>{
    switch (action.type) {
        case ActionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading:true};
        case ActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading:false , success:true}
        case ActionTypes.PRODUCT_CREATE_REVIEW_FAIL:
            return { loading:false, error: action.payload};
        case ActionTypes.PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state;
    }
}

const topProductsReducer = ( state= { products:[] }, action ) => { 
    switch (action.type){
        case ActionTypes.TOP_PRODUCTS_REQUEST:
            return { loading: true , products:[] }
        case ActionTypes.TOP_PRODUCTS_SUCCESS:
            return { loading: false, products: action.payload}
        case ActionTypes.TOP_PRODUCTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export { productsListReducer, productDetailsReducer, deleteProductReducer, createProductReducer,
     updateProductReducer, updateProductStockCountReducer, createReviewReducer, topProductsReducer};
