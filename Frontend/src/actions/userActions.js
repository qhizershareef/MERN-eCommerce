import * as ActionTypes from '../actionTypes/constants.js';
import axios from 'axios'


export const login = (email, password) => async (dispatch) =>{
    try {
        dispatch({
            type: ActionTypes.USER_LOGIN_REQUEST,
        })
        const config ={
            headers: {
                'Content-Type': 'application/json',
            }
        }
         const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        )

        dispatch({
            type: ActionTypes.USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        // console.error(error.message);
        dispatch({
            type: ActionTypes.USER_LOGIN_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
};

export const logout = () => (dispatch) => {
    dispatch(
        {
            type:ActionTypes.USER_LOGOUT
        }
    )
    dispatch(
        {type: ActionTypes.USER_DETAILS_RESET}
    )
    
    dispatch(
        {type: ActionTypes.ORDERS_FETCH_RESET}
    )
    dispatch(
        {type: ActionTypes.USERS_LIST_RESET}
    )
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('userInfo');
    document.location.href = '/login'
};

export const register = (name, email , password) => async (dispatch) => {
   
    try {
        dispatch({
            type: ActionTypes.USER_REGISTER_REQUEST,
        })
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    
        const { data } = await axios.post('/api/users', {name, email, password}, config );
        console.log(data)
        dispatch(
            {
                type:ActionTypes.USER_REGISTER_SUCCESS,
                payload: data
            }
        )
        
        dispatch({
            type: ActionTypes.USER_LOGIN_SUCCESS,
            payload: data,
        })
        
        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type:ActionTypes.USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
        })
    }

}

export const getUserDetails = ( id ) => async (dispatch, getState)=> {
    try {
        dispatch({
            type:ActionTypes.USER_DETAILS_REQUEST
        });
        //with the help of getState we can get any state from redux we will get userLogin so we get user access
        
        const { userLogin:{ userInfo} } = getState();

        const config ={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}`,
            config
        );
        
        dispatch(
            {
                type:ActionTypes.USER_DETAILS_SUCCESS,
                payload: data
            }
        )
            
        console.log(data);
    } catch (error) {
        dispatch({
            type:ActionTypes.USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
        })
    }
}

export const updateProfile = ( user ) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: ActionTypes.USER_PROFILE_UPDATE_REQUEST
        })
        // in order to get the token from the userINfo we need to fetch it from the state 
        //using getState

        const { userLogin : { userInfo } } = getState();

        const config ={
            headers :{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put('/api/users/profile',user,config);
        console.log(data)
        dispatch({
            type: ActionTypes.USER_PROFILE_UPDATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: ActionTypes.USER_LOGIN_SUCCESS,
            payload: data,
          })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:ActionTypes.USER_PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
        })
    }
}

export const getUsers = () => async (dispatch, getState) => {
    try {

        dispatch({
            type:ActionTypes.USERS_LIST_REQUEST
        })

        const { userLogin : { userInfo }} = getState();

        const config ={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get('/api/users', config);

        dispatch({
            type: ActionTypes.USERS_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ActionTypes.USERS_LIST_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type:ActionTypes.USER_DELETE_REQUEST
        });

        const { userLogin:{userInfo} } = getState();

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data }  = await axios.delete(`/api/users/admin/${id}`, config);
        
        dispatch({
            type: ActionTypes.USER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:ActionTypes.USER_DELETE_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
        })
    }
}


export const updateUser = ( user ) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type:ActionTypes.USER_UPDATE_REQUEST
        });

        const { userLogin:{userInfo} } = getState();

        const config = {
            headers :{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data }  = await axios.put(`/api/users/admin/${user._id}`, user, config );
        
        dispatch({
            type: ActionTypes.USER_UPDATE_SUCCESS,
        })
        dispatch(
            {
                type:ActionTypes.USER_DETAILS_SUCCESS,
                payload: data
            }
        )

    } catch (error) {
        dispatch({
            type:ActionTypes.USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message 
                     : error.message
        })
    }
}