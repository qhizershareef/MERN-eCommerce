import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';

function RegisterScreen ({ history, location }) {

    const [name, setName]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');


    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log('register user')
        if(password===confirm){
            dispatch(register(name,email,password))
        }else{
            setMessage('Passwords do not Match!')
        }
    }

    const redirect = location.search ? location.search.split('=')[1]: '/';

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const {loading, error, userInfo} = userRegister;
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    return (
        <FormContainer>
            <h1>SIGN UP:</h1>
            {loading && <Loader/>}
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group controlId="Name">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group controlId="Name">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="Name">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirm}
                        onChange={(e)=>setConfirm(e.target.value)}
                    />
                </Form.Group>

                <Button variant="dark" 
                        type='submit'
                        className="text-center"
                >
                    Register
                </Button>
            </Form>
            <Row>
                <Col className="py-3">
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen;
