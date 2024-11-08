import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container, Row } from "reactstrap";

const Setting = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Setting" />
          <Row>Setting</Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Setting;
