import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Container, Table  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateProfile} from '../actions/userActions';
import { fetchOrders } from '../actions/orderActions';
import * as ActionTypes from '../actionTypes/constants';

function ProfileScreen({history, location}) {

    const [name, setName] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const userDetails = useSelector( state=> state.userDetails);
    const {loading, error, user} = userDetails;
    
    const userLogin = useSelector( state=> state.userLogin);
    const {userInfo} = userLogin;

    const userProfileUpdate
     = useSelector( state=> state.userProfileUpdate);
    const { success } = userProfileUpdate;

    const getOrderItems = useSelector( state=> state.fetchOrders);
    const{ loading:ordersLoading, orders, error:ordersError } = getOrderItems

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        else{
            if(!user.name){
                dispatch(getUserDetails('profile'));
                dispatch(fetchOrders());
            }
            else{
                setName(user.name);
                setEmail(user.email)
            }
        }
    },[dispatch, history, userInfo, user,orders, success])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(password===confirm){
            dispatch(updateProfile({id:user._id,name, email, password}))
        }else{
            setMessage('Passwords do not Match!')
        }

    }
    
    return (
        <Container>
            <Row>
            <Col md={3}>
                <h2>USER PROFILE</h2>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader/>}
                {success&& <Message variant="success">Profile Has been Updated!</Message>}
                {message&& <Message variant="warning">{message}</Message>}
                <Form>
                    <Form.Group controlId="Name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Name" 
                            value={name} 
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Enter Your Email" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter Your Password" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Confirm">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" 
                            value={confirm}
                            onChange ={(e)=> setConfirm(e.target.value)}
                        />
                    </Form.Group>
                    <Button className="btn btn-black" type="submit" onClick={handleSubmit}>
                        Update
                    </Button> 
                </Form>
            </Col>
            <Col md={9}>
                <h2>MY ORDERS</h2>
                {ordersLoading ? (
                    <Loader />
                ) : ordersError ? (
                    <Message variant='danger'>{ordersError}</Message>
                    ) : (
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                       <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                       </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(el=>(
                            <tr key={el._id}>
                                <td>{el._id}</td>
                                <td>{el.createdAt.substring(0,10)}</td>
                                <td>${el.totalPrice.toFixed(2)}</td>
                                <td>{el.isPaid  ? '✅':'❌'}</td>
                                <td>{el.isDelivered ? '✅':'❌'}</td>
                                <td><LinkContainer to={`/order/${el._id}`}>
                                        <Button className="btn-sm">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>   
                )}
            </Col>
        </Row>
        </Container>
    )
}

export default ProfileScreen;
