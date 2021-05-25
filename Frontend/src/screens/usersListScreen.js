import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Container, Table  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { deleteUser, getUsers} from '../actions/userActions';
import * as ActionTypes from '../actionTypes/constants';

function UsersListScreen({history, location}) {

    const dispatch = useDispatch();
   
    const userLogin = useSelector( state=> state.userLogin);
    const {userInfo} = userLogin;

    const deletedUser = useSelector(state=> state.deleteUser);
    let {success, message:messageDelete, error:errorDelete} = deletedUser;

    const usersList
     = useSelector( state=> state.usersList);
    const { loading, users, error } = usersList;


    useEffect(()=>{
        if(!userInfo && userInfo.isAdmin){
            history.push('/login')
        }
        else{
            dispatch(getUsers());
        }
        if(success){
            dispatch({type: ActionTypes.USER_DELETE_RESET})
        }
    },[dispatch, history, userInfo, success,messageDelete ])

    const deleteHandler = (id) =>{
        if(window.confirm('You are deleting a user, u sure?'))
            dispatch(deleteUser(id));
    }
    
    return (
        <Container>
            <Row>
                <Col>
                    <h1>USERS LIST:</h1>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                        ) : (
                    <Table striped bordered hover size="sm" responsive>
                        <thead>
                        <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>CREATED AT</th>
                                <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {users && users.map(el=>(
                                <tr key={el._id}>
                                    <td>{el._id}</td>
                                    <td>{el.name}</td>
                                    <td>{el.email}</td>
                                    <td>{el.isAdmin  ? '✅':'❌'}</td>
                                    <td>{el.createdAt.substring(0,10)}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${el._id}/edit`}>
                                            <Button variant="light" className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm"
                                            onClick={()=>deleteHandler(el._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
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

export default UsersListScreen;
