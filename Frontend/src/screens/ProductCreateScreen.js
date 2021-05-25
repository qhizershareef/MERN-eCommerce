import { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import axios from 'axios';
import { createProduct } from "../actions/productActions";
const ProductCreateScreen = ({history}) =>{
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setFile] = useState(null)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch();

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin;

    const createdProduct = useSelector(state => state.createProduct);
    const { loading, product, success, error} = createdProduct;

    const fileHandler =(e)=>{
        console.log('the value of image is', image);
        setFile(e.target.files[0])
        console.log(image)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(name,price,image);
        const data = new FormData();
        data.append('image',image);
        console.log('uploading');
        axios.post('/api/products/uploadfile', data)
            .then((res)=>{
                console.log(res)
                setUploading(true);
                dispatch(createProduct(
                    {
                        name: name,
                        price: price,
                        image: '/uploads/'+image.name,
                        brand: brand,
                        category: category,
                        countInStock: countInStock,
                        description: description,
                    }
                ))
                alert('uploaded successfully')
        }).catch(err=>console.log(err))
        
    }

    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }
        if (success) {
            history.push('/admin/productslist')
        }
    },[dispatch,  userInfo, product, history, success ])

    return(
        <FormContainer>
            <h1>Create Product: </h1>
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
                    <Form.Control type="file"
                        onChange={fileHandler}
                    />
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
    )
}

export default ProductCreateScreen;