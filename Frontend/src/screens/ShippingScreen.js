import {useState} from 'react'
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { cartSaveShipping } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import NavComponent from '../components/NavComponent';
import Loader from "../components/Loader";
import Message from "../components/Message";

function ShippingScreen ({history}) {
    
    const dispatch = useDispatch();
    const user = useSelector(state=> state.userLogin);
    const {userInfo} = user;

    if(!userInfo){
        history.push('/login')
    }
    
    const cart = useSelector(state => state.cart);

    const { shippingAddress } = cart; 

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostal] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const [message, setMessage] = useState('')
    
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(cartSaveShipping({address, city, postalCode, country}))
        if(address && city && postalCode && country){
            history.push('/payment')
        }else{
            setMessage('Fields Are Empty!!')
        }
    }

    return (
        <FormContainer>
            <NavComponent item1 item2/>    
            <h1>SHIPPING:</h1>
            {message && <Message variant="danger">{message}</Message>}
            <Form>
                <Form.Group controlId="Address">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control  placeholder="Enter Address" 
                        value={address}
                        onChange = {(e)=>setAddress(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group controlId="City">
                    <Form.Label>City:</Form.Label>
                    <Form.Control value={city} placeholder="Enter City" 
                        onChange = {(e)=>setCity(e.target.value)}/>
                </Form.Group>
                
                <Form.Group controlId="Postal">
                    <Form.Label>Postal Code:</Form.Label>
                    <Form.Control value={postalCode} placeholder="Enter Postal Code" 
                        onChange = {(e)=>setPostal(e.target.value)}/>
                </Form.Group>
                
                <Form.Group controlId="Country">
                    <Form.Label>Country:</Form.Label>
                    <Form.Control value={country} placeholder="Enter Country" 
                        onChange = {(e)=>setCountry(e.target.value)}/>
                </Form.Group>
                <div className='text-center'>
                    <Button className='btn btn-black' type="submit" onClick={submitHandler}>Continue</Button>

                </div>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
