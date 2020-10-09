import React, { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteProduct, listProducts, createProduct } from "../redux/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../redux/types";

const ProductListPage = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo && !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, userInfo, history, successDelete, successCreate, createdProduct]);

  if (loading || loadingDelete || loadingCreate) {
    return <Loader />;
  }

  if (error || errorDelete || errorCreate) {
    return <Message variant="danger">{error || errorDelete || errorCreate}</Message>;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleCreate = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Row className="align-items-center my-3">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button onClick={handleCreate}>
            <i className="fas fa-plus" /> Create Product
          </Button>
        </Col>
      </Row>

      <Table hover responsive striped className="table-sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ _id, name, price, category, brand }) => (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{name}</td>
              <td>${price}</td>
              <td>{category}</td>
              <th>{brand}</th>
              <td>
                <LinkContainer to={`/admin/product/${_id}/edit`}>
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

export default ProductListPage;
