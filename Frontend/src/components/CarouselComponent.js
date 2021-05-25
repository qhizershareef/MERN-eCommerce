import {useEffect} from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {listTopProducts}  from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';


function CarouselComponent() {

    const dispatch = useDispatch();

    const topProducts = useSelector(state=> state.topProducts);
    const {loading, error, products} = topProducts;

    useEffect(()=>{
        dispatch(listTopProducts())
    },[dispatch])

    return (
        <>
            {loading&& <Loader/>}
            {error && <Message variant="danger">{error}</Message>}
            {products &&
                <Carousel pause='hover' className='bg-dark'>
                    {
                        products.map(product=>
                            <Carousel.Item class="Slide" key={product._id}>
                                <Link to={`/product/${product._id}`}>
                                    <Image src={product.image} alt={product.name} fluid />
                                    <Carousel.Caption className='carousel-caption'>
                                    <h2>
                                        {product.name} (${product.price})
                                    </h2>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                    )}
                </Carousel>
            }
        </>
    )
}

export default CarouselComponent;
