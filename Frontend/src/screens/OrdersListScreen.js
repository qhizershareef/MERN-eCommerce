import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Table, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { adminOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const OrdersListScreen = ({ history, match }) => {

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const listOrders = useSelector(state => state.getAllOrders);
    
    const { loading, error, orders, pages, page } = listOrders;

    console.log(orders)
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        dispatch(adminOrders(pageNumber));

    }, [dispatch, history, userInfo, pageNumber])
    return (
        <Container>
            <h1>ORDERS:</h1>
            {
                loading ? <Loader /> :
                    error ? <Message variant='danger'>{error}</Message>
                        :
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    orders && orders.map(el => (
                                        <tr key={el._id}>
                                            <td>{el._id}</td>
                                            <td>{el.user.name}</td>
                                            <td>{el.createdAt.substring(0,10)}</td>
                                            <td>${el.totalPrice.toFixed(2)}</td>
                                            <td>{el.isPaid ? '✅' : '❌'}</td>
                                            <td>{el.isDelivered ? '✅' : '❌'}</td>
                                            <td>
                                                <LinkContainer to={`/order/${el._id}`}>
                                                    <Button variant='dark' className='btn-sm'>
                                                        Details
                                            </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>))
                                }
                            </tbody>
                        </Table>

            }
            <div className="d-flex justify-content-center">
                <Paginate pages={pages} page={page} isAdmin={true} orders={true}/>
            </div>
        </Container>
    )
}

export default OrdersListScreen;
