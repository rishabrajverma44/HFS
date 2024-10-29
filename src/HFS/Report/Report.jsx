import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container, Row } from "reactstrap";

const Report = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Report" />
          <Row>Report</Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Report;
