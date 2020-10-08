import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteUser, listUser } from "../redux/actions/userActions";

const UserListPage = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) dispatch(listUser());
    else history.push("/login");
  }, [dispatch, userInfo, history, successDelete]);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <h1>Users</h1>

      <Table hover responsive striped className="table-sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ _id, name, email, isAdmin }) => (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>
                {isAdmin ? (
                  <i className="fas fa-check" style={{ color: "green" }} />
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/user/${_id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit" />
                  </Button>
                </LinkContainer>
                <Button variant="danger" className="btn-sm" onClick={() => handleDelete(_id)}>
                  <i className="fas fa-trash" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserListPage;
