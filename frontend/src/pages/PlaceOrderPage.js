import React from "react";
import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../redux/actions/orderActions";
import { ORDER_CREATE_RESET, ORDER_DETAILS_REQUEST } from "../redux/types";

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const { address, city, postalCode, country } = shippingAddress;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, error, order } = orderCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch({ type: ORDER_DETAILS_REQUEST });
      history.push(`/order/${order._id}`);
    }
    //eslint-disable-next-line
  }, [success, history, order]);

  const twoDecimals = (num) => {
    return num.toFixed(2);
  };

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingPrice = itemsPrice * 0.07;
  const taxPrice = itemsPrice * 0.05;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handleOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: twoDecimals(itemsPrice),
        shippingPrice: twoDecimals(shippingPrice),
        taxPrice: twoDecimals(taxPrice),
        totalPrice: twoDecimals(totalPrice),
      })
    );
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="mt-0">Address:</h2>
              <p>
                {address}, {city} {postalCode}, {country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method:</h2>
              <strong>Methods: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty!</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product} className="pl-0">
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={7}>
                          ${item.price} x {item.qty} = ${item.price * item.qty}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items Price</Col>
                  <Col className="text-right">${twoDecimals(itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col className="text-right">${twoDecimals(shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax Price</Col>
                  <Col className="text-right">${twoDecimals(taxPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col className="text-right">${twoDecimals(totalPrice)}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button type="button" className="btn-block" onClick={handleOrder}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
