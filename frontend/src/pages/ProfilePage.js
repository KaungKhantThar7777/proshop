import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../redux/actions/userActions";
import { getMyOrders } from "../redux/actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

const ProfilePage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails("profile"));
        dispatch(getMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setMessage(null);
      dispatch(updateUserProfile({ name, email, password }));
    } else {
      setMessage("Passwords do not match!");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9} className="mt-md-0 mt-3">
        <h2>My Orders</h2>
        {loadingOrders && <Loader />}
        {errorOrders && <Message variant="danger">{errorOrders}</Message>}
        {orders && (
          <Table striped bordered hover responsive className="table-sm text-center">
            <thead>
              <th>Id</th>
              <th>Date</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </thead>
            <tbody>
              {orders.map(({ _id, createdAt, isPaid, paidAt, isDelivered, deliveredAt }) => (
                <tr>
                  <td>{_id}</td>
                  <td>{createdAt.substr(0, 10)}</td>
                  <td>
                    {isPaid ? (
                      paidAt.substr(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {isDelivered ? (
                      deliveredAt.substr(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${_id}`}>
                      <Button variant="light" className="btn-sm text-center">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
