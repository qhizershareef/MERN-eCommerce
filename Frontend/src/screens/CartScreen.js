import { useEffect } from 'react';
import Message from '../components/Message';
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Form, Card } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux';
import  { addToCart, removeFromCart}  from '../actions/cartActions';


const CartScreen = ({match, location, history, }) =>{
    
    const productId = match.params.id;

    const qty = location.search? location.search.split('=')[1] : 1
    
    const dispatch = useDispatch()

    const cart = useSelector( state => state.cart);


    const {cartItems} = cart

    useEffect(()=>{
        if(productId)
            {
                dispatch(addToCart(productId, qty))
            }
    },[dispatch, productId, qty])

    const removeFromCartHandler = (id) => {

        console.log('id');
        dispatch(removeFromCart(id));
        history.push('/Cart')
    }

    const checkoutHandler = () =>{
        history.push('/login?redirect=shipping')
    }
    return(
        <Row>
            <Col md={8} sm={12} > 
                <h1>Shopping Cart</h1>
                 { cartItems.length === 0 ?( <Message> Your cart is empty <Link to='/'>Go Back</Link></Message>):(
                    <ListGroup variant="flush">
                        {cartItems.map(item=>{
                            return(<ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={2}>
                                                ${item.price}
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control as="select" value={item.qty} onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {
                                                        [...Array(item.countInStock).keys()].map(el=>{
                                                            return <option key={el+1} value={el+1}>{el+1}</option>
                                                        })
                                                    }
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button type='button' variant='light' onClick={()=>{removeFromCartHandler(item.product);console.log('delete '+item.name+' item from state')}}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                   </ListGroup.Item>)
                        })}
                    </ListGroup>
                 )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>SUBTOTAL ({cartItems.reduce((acc, item)=> acc+ item.qty,0)}) ITEMS</h2>
                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            sub: ${cartItems.reduce((acc, item)=>acc+ item.price*item.qty,0)
                                            .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" 
                                variant='dark' 
                                className='btn-block' 
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                PROCEED TO CHECKOUT
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}
export default CartScreen;