import { useEffect, useState } from 'react';
import { Row, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import * as ActionTypes from '../actionTypes/constants';

function UserEditScreen ({match, history}) {
    const userId = match.params.id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');  
    const [admin, setAdmin] = useState(false);  
    const dispatch = useDispatch();
    const userLogin = useSelector(state=> state.userLogin);
    const { userInfo} = userLogin;
    const userDetails = useSelector(state=> state.userDetails);
    const {loading, error,  user} = userDetails;

    const updatedUser = useSelector( state=> state.updateUser);
    const { loading: loadingUpdate,
        error: errorUpdate, success} = updatedUser;

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }
        if (success) {
            dispatch({ type: ActionTypes.USER_UPDATE_RESET })
            history.push('/admin/userslist')
        }
        else{
            if(!user.name || user._id !== userId) { 
                    dispatch(getUserDetails(userId));
                }
                else{
                    setName(user.name);
                    setEmail(user.email);
                    setAdmin(user.isAdmin);
                }
            }
    }, [dispatch, userId, user, history, success ])

    const submitHandler = (e) => {
        e.preventDefault();
        if( name || email || admin ){
             dispatch(updateUser({ _id: userId, name:name,email:email,isAdmin: admin}))
        }
    }
    return (
        <>
            <Row>
                <Link className="btn btn-light my-3" to="/admin/userslist">
                    Go Back
                </Link>
                <FormContainer>
                    <h1>Edit User:</h1>
                    {error && <Message variant="danger">{error}</Message>}
                    {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                    {loading && <Loader/>}
                    {success&& <Message variant="success">User Has been Updated!</Message>}
                    <Form onSubmit={submitHandler} >
                        <Form.Group controlId="Name">
                            <Form.Label>
                                Name:
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter Name:" value={name} 
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="Email">
                            <Form.Label>
                                Email:
                            </Form.Label>
                            <Form.Control type="Email" placeholder="Enter Email:" value={email} 
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin?'
                                checked={admin}
                                onChange={(e) => setAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>
                        <Button type="submit">
                            Submit
                        </Button>
                    </Form>
                </FormContainer>

            </Row>

        </>
    )
}

export default UserEditScreen;
