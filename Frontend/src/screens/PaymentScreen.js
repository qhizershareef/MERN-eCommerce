import {useState} from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import NavComponent from '../components/NavComponent';
import { savePaymentMethod } from '../actions/cartActions';

function PaymentScreen ({ history }) {
    console.log('payment screen')
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    const { shippingAddress } = cart; 
    console.log(shippingAddress)

    const userLogin = useSelector( state=> state.userLogin);
    const {userInfo} = userLogin;

    
    if(!userInfo){
        history.push('/login')
    }

    if(Object.keys(shippingAddress).length === 0){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        alert(paymentMethod)
        history.push('/placeorder')
    }


    return (
        <FormContainer>
            <NavComponent item1 item2 item3/>    
            <h1>PAYMENT METHOD:</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                <Col>
                    <Form.Check 
                        type="radio" 
                        label="Paypal or Credit Card" 
                        id="PayPal" 
                        name="paymentMethod" 
                        value="Paypal" 
                        checked 
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                    <Form.Check 
                        type="radio" 
                        label="Cash On Delivery" 
                        id="COD" 
                        name="paymentMethod" 
                        value="Cash On Delivery" 
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                </Col>
                
                </Form.Group>
                <Button className='btn btn-black' type="submit" onClick={submitHandler}>Continue</Button>
              
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
