import * as ActionTypes from '../actionTypes/constants';

const userLoginReducer = (state={ },action) => {
    switch (action.type) {
        case ActionTypes.USER_LOGIN_REQUEST:
            return { loading: true }
        case ActionTypes.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case ActionTypes.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case ActionTypes.USER_LOGOUT:
            return { }
        default:
            return state;
    }
}

const userRegisterReducer = (state={},action) => {
    switch (action.type) {
        case ActionTypes.USER_REGISTER_REQUEST:
            return { loading: true }
        case ActionTypes.USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case ActionTypes.USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

const userDetailsReducer = (state = { user:{}},action) =>{
    switch (action.type) {
        case ActionTypes.USER_DETAILS_REQUEST:
            return {...state, loading:true }
        case ActionTypes.USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case ActionTypes.USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case ActionTypes.USER_DETAILS_RESET:
            return {}
        default:
            return state;
    }
}

const userProfileUpdateReducer = ( state={} , action ) =>{
    switch ( action.type ) {
        case ActionTypes.USER_PROFILE_UPDATE_REQUEST:
            return { loading: true }
        case ActionTypes.USER_PROFILE_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload, success:true }
        case ActionTypes.USER_PROFILE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case ActionTypes.USER_PROFILE_UPDATE_RESET:
            return { }
        default:
            return state;
    }
}

const usersListReducer = (state = { users:[] }, action) => {
    switch (action.type) {
        case ActionTypes.USERS_LIST_REQUEST:
            return { loading: true}
        case ActionTypes.USERS_LIST_SUCCESS:
            return { loading: false, users: action.payload}
        case ActionTypes.USERS_LIST_FAIL:
            return { loading: false, error: action.payload}
        case ActionTypes.USERS_LIST_RESET:
            return { users: [] }
        default:
            return state;
    }
}

const deleteUserReducer = (state={}, action)=>{
    switch (action.type) {
        case ActionTypes.USER_DELETE_REQUEST:
            return {loading:true};
        case ActionTypes.USER_DELETE_SUCCESS:
            return { loading:false, message: action.payload, success:true}
        case ActionTypes.USER_DELETE_FAIL:
            return { loading:false, error: action.payload};
        case ActionTypes.USER_DELETE_RESET:
            return { }
        default:
            return state;
    }
}

export const updateUserReducer = ( state = {}, action )=>{
    switch (action.type) {
        case ActionTypes.USER_UPDATE_REQUEST:
            return {loading:true};
        case ActionTypes.USER_UPDATE_SUCCESS:
            return { loading:false , success:true}
        case ActionTypes.USER_UPDATE_FAIL:
            return { loading:false, error: action.payload};
        case ActionTypes.USER_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}
export { userLoginReducer, userRegisterReducer, userDetailsReducer, userProfileUpdateReducer,usersListReducer, deleteUserReducer};