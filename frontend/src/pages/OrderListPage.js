import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrders } from "../redux/actions/orderActions";

const UserListPage = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) dispatch(getOrders());
    else history.push("/login");
  }, [dispatch, userInfo, history]);

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <>
      <h1>Orders</h1>

      <Table hover responsive striped className="table-sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(
            ({ _id, user, createdAt, totalPrice, isPaid, isDelivered, paidAt, deliveredAt }) => (
              <tr key={_id}>
                <td>{_id}</td>
                <td>{user.name}</td>
                <td>{createdAt.substr(0, 10)}</td>
                <td>${totalPrice}</td>
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
                  <LinkContainer to={`/order/${_id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
};

export default UserListPage;
