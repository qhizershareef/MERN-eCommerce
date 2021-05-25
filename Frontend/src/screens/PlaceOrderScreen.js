import { useEffect } from 'react';
import NavComponent from '../components/NavComponent';
import { Row, Col, Card, ListGroup, Image, Button  } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link  } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import * as ActionTypes from '../actionTypes/constants';

function PlaceOrderScreen ({history}) {
    const orderCreate = useSelector(state => state.orderCreate );
    const {error, success, order} = orderCreate;

    useEffect(()=>{
        if(success){
            history.push('/order/'+order._id);
            dispatch({ type: ActionTypes.USER_DETAILS_RESET })
        }
    },[success, order, history])

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const cart  = useSelector(state=> state.cart);
    const { shippingAddress, cartItems, paymentMethod} = cart;

    cart.itemsPrice = cartItems.reduce((accumulator, item)=> (accumulator + item.price*item.qty) ,0);

    cart.shippingPrice = cart.itemsPrice>100? 0 : 50;

    cart.taxPrice = Number((0.15* cart.itemsPrice).toFixed(2));
    
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    if(!userInfo){
        history.push('/login');
    }

    const submitHandler=()=>{
        console.log('Order Created');
        dispatch(createOrder(
            {
                shippingAddress: cart.shippingAddress,
                orderItems: cartItems,
                itemsPrice: cart.itemsPrice,
                shippingPrice : cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
                paymentMethod: paymentMethod
            }
        ))
    }

    return (
        <Row className='justify-content-center mb-4 nav'>
            <NavComponent item1 item2 item3 item4/>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>SHIPPING:</h2>
                        <strong>Address:</strong> {`${shippingAddress.address} , ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <h2>PAYMENT METHOD:</h2>
                       <strong>Method: </strong>
                       {paymentMethod}
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <h2>ORDER ITEMS:</h2>
                       <Row>
                           <ListGroup variant="flush">
                               {cartItems.map(itm=>{
                                   return <ListGroup.Item>
                                       <Row>
                                            <Col md={1}>
                                                <Image src={itm.image} alt={itm.name} fluid rounded />
                                            </Col>
                                            <Col md={7}>
                                                <Link to={`/product/${itm.product}`}><strong  style={{color:'gray'}}>{itm.name}</strong></Link>
                                            </Col>
                                            <Col md={4}>
                                                <strong>{itm.qty} x ${itm.price}</strong>
                                                {' '}
                                                =
                                                {' '}
                                                <strong style={{color:'crimson'}}>${itm.qty*itm.price}</strong>
                                            </Col>
                                       </Row>
                                   </ListGroup.Item>
                               })}
                           </ListGroup>
                       </Row>
                   </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item><h2>ORDER SUMMARY:</h2></ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${cart.shippingPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${cart.totalPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn-block btn-black" onClick={submitHandler}>Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default PlaceOrderScreen;
