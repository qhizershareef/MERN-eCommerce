import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import axios from 'axios';
import { updateProduct, listProductDetails } from "../actions/productActions";
import Loader from '../components/Loader';
import Message from '../components/Message';
import * as ActionTypes from '../actionTypes/constants';

const ProductEditScreen = ({history, match}) =>{

    
    const prodId = match.params.id;

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [file, setFile] = useState(null)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch();
    
    const productDetails = useSelector(state=> state.productDetails)
    const { product} = productDetails;

    const updatedProduct = useSelector(state=> state.updateProduct)

    const {success, error:updateError} = updatedProduct

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin;

    const fileHandler =(e)=>{
        console.log('the value of image is', image);
        setFile(e.target.files[0])
        console.log(image)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(name,price,file);
        const data = new FormData();
        data.append('image',file);
        console.log('uploading');
        if(file){
            axios.post('/api/products/uploadfile', data)
            .then((res)=>{
                console.log(res)
                setUploading(true);
                dispatch(updateProduct(
                    {
                        _id: product._id,
                        name: name,
                        price: price,
                        image: '/uploads/'+file.name,
                        brand: brand,
                        category: category,
                        countInStock: countInStock,
                        description: description,
                    }
                ))
                alert('uploaded successfully')
            }).catch(err=>console.log(err))
        }else{
            dispatch(updateProduct(
                {
                    _id: product._id,
                    name: name,
                    price: price,
                    image: image,
                    brand: brand,
                    category: category,
                    countInStock: countInStock,
                    description: description,
                }
            ))
        }
        
    }

    useEffect(()=>{
        
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }
        
        if (success) {
            dispatch({ type: ActionTypes.PRODUCT_UPDATE_RESET })
            dispatch(listProductDetails(prodId))
            history.push('/admin/productslist')
        }
        else{
            if(!product.name || product._id !== prodId) { 
                    dispatch(listProductDetails(prodId))
                }
                else{
                    setName(product.name);
                    setPrice(product.price);
                    setImage(product.image);
                    setDescription(product.description);
                    setBrand(product.brand);
                    setCategory(product.category);
                    setCountInStock(product.countInStock);
                }
            }
    }, [dispatch, prodId, userInfo, product, history, success ])

    return(
        <>
            <Link variant="light" to="/admin/productslist" className="btn btn-primary my-3">GO BACK</Link>
         <FormContainer>
            <h1>UPDATE PRODUCT: </h1>
            
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} type="text" placeholder="Enter Name:"
                        onChange={(e)=> setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control value={price} type="text" placeholder="Enter price:"
                        onChange={(e)=> setPrice(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Attach Image:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.File label='Choose File' custom  
                        onChange={fileHandler}
                    />
                    {uploading && <Loader />}   
                </Form.Group>
                <Form.Group controlId="Brand">
                    <Form.Label>Brand:</Form.Label>
                    <Form.Control value={brand} type="text"
                        onChange={(e)=> setBrand(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Label>category:</Form.Label>
                    <Form.Control value={category} type="text"
                        onChange={(e)=> setCategory(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="countInStock">
                    <Form.Label>countInStock:</Form.Label>
                    <Form.Control value={countInStock} type="text"
                        onChange={(e)=> setCountInStock(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>description:</Form.Label>
                    <Form.Control value={description} type="text"
                        onChange={(e)=> setDescription(e.target.value)}
                    />
                </Form.Group>
                <div className="text-center">
                    <Button type="submit" >Submit</Button>
                </div>
            </Form>
        </FormContainer>
   
        </>
    )
}

export default ProductEditScreen;