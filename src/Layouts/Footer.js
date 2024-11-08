import React from "react";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer galaxy-border-none">
        <Container fluid>
          <Row>
            <Col sm={6}>
              © Druk Green Power Corporation Limited {new Date().getFullYear()}.
            </Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                All Rights Reserved
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
