import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container, Row } from "reactstrap";

const User = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User" />
          <Row>User</Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default User;
