import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {listProducts}  from '../actions/productActions';
import Product from "../components/Product";
import Message from '../components/Message';
import Loader from '../components/Loader';
import CarouselComponent from '../components/CarouselComponent';
import { Row, Col } from "react-bootstrap";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";


function HomeScreen({match}) {

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch()

  const productList = useSelector((state)=> state.productsList)
  //destructuring productList to loading, products, and error
  const { loading, error, products, page, pages } = productList;

  useEffect(()=>{

    dispatch(listProducts(keyword, pageNumber))
  
  },[dispatch,keyword,pageNumber])
  return (
    <>
      {!keyword && <CarouselComponent/>}
      

      { 
        loading ? (
          <Loader/>
        ) : error ?
          <Message children={error}/>
        :<>
          <Meta/>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        <div className="d-flex justify-content-center">
          <Paginate pages={pages} page={page} isAdmin={false} />
        </div>
        </>
      }
    </>
  );
}

export default HomeScreen;
