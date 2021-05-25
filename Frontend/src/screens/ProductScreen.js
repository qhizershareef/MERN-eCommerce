import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {createReview, listProductDetails} from '../actions/productActions';
import { useEffect, useState} from "react";
import {Row, Col, Card, Image, ListGroup, Button, Form } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

const ProductScreen = ({ history, match}) => {

  const dispatch = useDispatch();

  const productDetails = useSelector( state => state.productDetails)

  const colors = ['#32064A','#ES6B1F','#FCC133','#3778C2','#E12B38'];
  const backgrounds=['#2069e0','#444444','#878683','#f4d47c'];

  const {loading, error, product}= productDetails;

  const [qty, setqty]= useState(1) 
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1)
  
  const userLogin = useSelector( state=> state.userLogin);
  const {userInfo} = userLogin;

  const userReview = useSelector( state=> state.createReview);
  const {loading:reviewLoading, error:reviewError, success} = userReview;

  let { id } = useParams();
  useEffect(()=>{
    dispatch(listProductDetails(id)) 
  },[dispatch,id, success])

  function addToCartHandler(){
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  function reviewSubmitHandler(e){
    e.preventDefault();
    dispatch(createReview({ comment, rating},id))
  }


  function Review({name,rating,comment,date}){
    let color = colors[Math.floor(Math.random() * colors.length)];
    
    const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    return(
      <>
        <div className="ReviewContainer">
          <div className="image_Col">
            <img src={`https://ui-avatars.com/api/?name=${name}&rounded=true&color=${color}&bold=true&background=${bg}`} alt="" />
          </div>
          <div className="comment_Col">
            <div className="review_Name">
                <h5> <strong>{name}</strong>  </h5>
                <p>{date.substr(0,10)}</p>
            </div>
            <div className="name_Rating">
                <Rating stars={rating}
                  />
              </div>
            <div className="comment">
              <p>{comment}</p>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <Link variant="dark" to="/" className="btn btn-secondary my-3">GO BACK</Link>
      {loading?
      <Loader/>:
      error? <Message variant="danger" message={error}/>:(
      <>
      <Meta title={product.name}/>
      <Row>
        <Col md={6} sm={12} >
          <img src={product.image} alt={product.name} style={{width:'100%', height:'auto'}} fluid/> 
         
        </Col>
        <Col md={3} className="my-1">
          <h4>{product.name}</h4>
          <hr/>
          <div className="productRating">
            <Rating stars={product.rating}
            text={`${product.numReviews} reviews`}
            />
          </div>
          <hr/>
          <div className="Price">
            <strong>Price:</strong>  ${product.price}
          </div>
          <hr/>
          <div className="productDescription">
            <strong>Description:</strong> { product.description}
          </div>  

        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush" >
                <ListGroup.Item>
                    <Row>
                      <Col>
                      <strong>Price:</strong>
                      </Col>
                      <Col>
                        <strong>${product.price}</strong> 
                      </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                      <Col>
                      <strong>Status:</strong>
                      </Col>
                      <Col>
                      <strong>{product.countInStock>0?'In Stock':'Out Of Stock!'}</strong>
                      </Col>
                    </Row>
                </ListGroup.Item>
                {
                  product.countInStock > 0 &&(
                    <ListGroup.Item>
                      <Form>
                        <Row>
                          <Col>
                            qty
                          </Col>
                          <Col>
                            <Form.Control as='select' value={qty} onChange={(e)=>setqty(e.target.value)}>
                              {
                                [...Array(product.countInStock).keys()].map(el=>(
                                  <option key={el+1} value={el+1}>{el+1}</option>
                                ))
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      </Form>
                    </ListGroup.Item>
                  )

                }
                <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button 
                          variant="dark" className='btn-block' type='button'
                          disabled={product.countInStock===0}
                          onClick={addToCartHandler}
                        >Add To Cart</Button>
                      </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

      </Row>
            {
              userInfo?
              <Row>
              <Col>
                  <div className="createReview py-5" >
                  {reviewError && <Message variant="danger">{reviewError}</Message>}
                  <h2>Write A Review:</h2>
                  <Form onSubmit={reviewSubmitHandler}><Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Comment:</Form.Label>
                          <Form.Control as="textarea" rows={4} value={comment} onChange={(e)=>setComment(e.target.value)}/>
                        </Form.Group>
                      </Col>
                      <Col md={4} sm={12}>
                        <Form.Group>
                          <Form.Label>Rating:</Form.Label>
                          <Form.Control as="select" value={rating} onChange={(e)=>setRating(e.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </Form.Control>
                        </Form.Group>
                        <Button type="submit" className="btn btn-block">Submit</Button>
                      </Col>
                    </Row>
                  </Form>
                  </div>
                  <h3>REVIEWS: </h3>
                  <div className="reviews_Container">
                      {
                        product && product.reviews.map(rev=>
                          <React.Fragment>
                            <Review name={rev.name} date={rev.createdAt} rating={rev.rating} comment={rev.comment}/>
                          </React.Fragment>
                        )
                      }
                  </div>
              </Col>
            </Row>
            :
            <Message variant="danger" message='Please login to review this product!'/>
            }
      </>
      )}

    </>);
}

export default ProductScreen;
