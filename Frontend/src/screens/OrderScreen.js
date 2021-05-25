import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder, payOrder } from '../actions/orderActions';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message'
import Loader from '../components/Loader';
import { PayPalButton } from "react-paypal-button-v2";
import * as ActionTypes from '../actionTypes/constants';
import axios from 'axios';
import { deliverOrder } from "../actions/orderActions";
import { updateProductStockCount } from '../actions/productActions';

function OrderScreen ({match, history}) {

    const orderId= match.params.id;

    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();

    const orderDetails = useSelector( state => state.orderDetails);
    const { order, loading, error } = orderDetails
    
    const userLogin = useSelector( state => state.userLogin);
    const { userInfo } = userLogin;

    const orderPay = useSelector ( state => state.orderPay);
    const { loading:loadingPay, success:successPay, error: errorPay} = orderPay; //renaming elements

    const orderDeliverStatus = useSelector( state=> state.orderDeliver);
    const { loading:loadingDeliver, success:successDeliver, error: errorDeliver} = orderDeliverStatus

    const successHandler = (PaymentResponse, data)=>{
        console.log(PaymentResponse,data)
        dispatch(payOrder(orderId, PaymentResponse))
        order.orderItems.forEach(Item=>{
            dispatch(updateProductStockCount(Item))
            dispatch({type:ActionTypes.PRODUCT_UPDATECOUNT_RESET})
        })
    }

    const deliverHandler = ()=>{
        console.log('setTodeliver')
        dispatch(deliverOrder(order))
    }
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }

        const addPaypalScript = async () =>{
            const {data: clientId}  = await axios.get('/api/paypal/client')
            const script = document.createElement('script');
            script.type ="text/javascript";
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true;
            script.onload= ()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || order._id !== orderId || successPay || successDeliver){
            dispatch({type:ActionTypes.ORDER_PAY_RESET}) //this will reset even when the params id does not match with the id stored in redux
            dispatch({type:ActionTypes.ORDER_DELIVER_RESET});
            
            dispatch(getOrder(orderId));
            
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }

    }, [dispatch, order, orderId, successPay, successDeliver]) 

    return (
         loading ?
              <Loader/>
            : error ? (
                <Message variant='danger'>{error}</Message>
            ):
            (
            <Row>
            <Col md={8}>
                <h1>Order {order._id}</h1>
                <ListGroup variant="flush">
                    <ListGroup.Item key="shipping">
                        <h2>SHIPPING:</h2>
                        <p><strong>Name:</strong> {order.user.name}</p>
                        <p><strong>Email:</strong> {order.user.email}</p>
                        <p> <strong>Address:</strong> {`${order.shippingAddress.address} , ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}</p>
                        {order.isDelivered?<Message variant="success">Out For Delivery :{order.deliveredAt.slice(0,10)}</Message>:
                        <Message variant="danger">Not Delivered!</Message>}
                   </ListGroup.Item>
                   <ListGroup.Item key="pay">
                       <h2>PAYMENT METHOD:</h2>
                       <p> 
                       <strong>Method: </strong>
                       {order.paymentMethod} </p>
                       {order.isPaid?<Message variant="success">Paid on {order.paidAt.slice(0,10)}</Message>:
                        <Message variant="danger">Not Paid!</Message>}
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <h2>ORDER ITEMS:</h2>
                       <Row>
                           <ListGroup variant="flush">
                               {order.orderItems.map(itm=>{
                                   return <ListGroup.Item key={itm._id}>
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
                                <Col>${order.itemsPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                    <PayPalButton
                                        amount={order.totalPrice.toFixed(2)}
                                        onSuccess={successHandler}
                                    />
                                )}
                            </ListGroup.Item>
                        )}
                        
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&
                            (<ListGroup.Item>
                                <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>)
                        }
                        
                    </ListGroup>
                </Card>
            </Col>
        </Row> )
    )
}

export default OrderScreen;
