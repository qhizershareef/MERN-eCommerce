import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import {Link } from 'react-router-dom';
import { Row, Col, Form, Button  } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = ({ location, history}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector( state => state.userLogin);


    const { loading,error,userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1]: '/';

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
            window.location.reload();
        }
    },[history, userInfo, redirect])

    function submitHandler(e){
        console.log('form');
        console.log('Loader and error values are :', loading, error)
        e.preventDefault()
        if(email && password){
            dispatch(login( email, password))
        }
    }
    return (
        <FormContainer>
                <h1>SIGN IN:</h1>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader/>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Addres:</Form.Label>
                            <Form.Control type="email" placeholder="Enter Your Email" value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button 
                            variant="dark" 
                            type='submit'
                            className="text-center"
                        >
                            Submit
                        </Button>
                    </Form>

            <Row className='py-3'>
                <Col>
                New Customer?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Register
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen;

