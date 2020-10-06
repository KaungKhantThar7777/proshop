import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container className="justify-content-md-center">
      <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
