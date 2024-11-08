import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container, Row } from "reactstrap";

const Notification = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Notification" />
          <Row>Notification</Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Notification;
