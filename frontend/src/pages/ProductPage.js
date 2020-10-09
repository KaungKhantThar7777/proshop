import React, { useEffect, useState } from "react";
import { ListGroup, Row, Col, Card, Image, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch } from "react-redux";
import { getProductDetails } from "../redux/actions/productActions";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductPage = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [match.params.id, dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  const addToCartHandler = () => {
    console.log("click");
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <>
      <Link to="/" className="btn btn-light mb-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt="Product image" fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item className="pt-md-0">
              <h4>{product.name}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row className="align-items-center">
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((q) => (
                          <option key={q + 1} value={q + 1}>
                            {q + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock < 1}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
