import { useEffect, useState } from 'react';
import { Button, Table, Row, Col, Container } from 'react-bootstrap';
import { deleteProduct, listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import * as ActionTypes from '../actionTypes/constants'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';


const ProductsListScreen = ({history, location, match}) => {

    const pageNumber = match.params.pageNumber || 1;
    const [currentpage, setPage] = useState(1);

    const dispatch = useDispatch()
    
    const userLogin = useSelector(state=> state.userLogin);
    const{ userInfo} = userLogin;

    const productsList = useSelector(state => state.productsList);
    const { loading, products, error, page, pages} = productsList;

    const deletedProduct = useSelector(state=> state.deleteProduct);
    const {success, error:productError} = deletedProduct;

    function handlePageClick(data){
        let selected = data.selected;
        setPage(selected)
    }
    useEffect(() => {
        if(!userInfo && userInfo.isAdmin){
            history.push('/login')
        }
        else{
            dispatch(listProducts('',pageNumber))
        }
        if(success){
            dispatch({type: ActionTypes.PRODUCT_DELETE_RESET})
        }
    }, [dispatch, history, userInfo, success, pageNumber, currentpage])

    const createProductHandler = () =>{
        history.push('/admin/products/create')
    }

    const deleteHandler = ( id ) => {
        if(window.prompt('Are You sure?')){
            dispatch(deleteProduct(id));
        }

    }

    return(
        <Container>
            <Col style={{display:'flex',justifyContent:'space-between'}}>
                <h1>
                    PRODUCTS:
                </h1>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
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
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {products && products.map(el=>(
                                <tr key={el._id}>
                                    <td>{el._id}</td>
                                    <td>{el.name}</td>
                                    <td>${el.price}</td>
                                    <td>{el.category}</td>
                                    <td>{el.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${el._id}/edit`}>
                                            <Button variant="light" className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm"
                                            onClick={()=>deleteHandler(el._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>   
                    )}
            <div className="d-flex justify-content-center">
                <Paginate pages={pages} page={page} isAdmin={true} />
            </div>
        </Container>
    )

}

export default ProductsListScreen;