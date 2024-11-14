import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Card, Col, Container, Row, Table, Button } from "reactstrap";

const User = () => {
  const userList = [
    {
      userName: "rishab",
      userRole: [
        "plant operator",
        "Administrator",
        "Analyst",
        "Viewer",
        "Technical Support",
      ],
    },
    {
      userName: "john",
      userRole: ["Admin", "Viewer", "Technical Support"],
    },
    {
      userName: "anna",
      userRole: ["Analyst", "Viewer"],
    },
    {
      userName: "mike",
      userRole: ["Administrator", "Viewer"],
    },
  ];

  const handleEdit = (index) => {
    // alert(`Edit user: ${index}`);
  };

  const handleRemove = (index) => {
    //alert(`Remove user: ${index}`);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User" />
          <Card>
            <Row>
              <p className="fs-3 fw-semibold mx-4 mt-1">User Management</p>
            </Row>
            <Row>
              <Col>
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className="align-middle text-center">Name</th>
                        <th>Roles</th>
                        <th className="align-middle text-center">Edit</th>
                        <th className="align-middle text-center">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map((user, index) => (
                        <tr key={index}>
                          <td className="fs-5 text-center align-middle">
                            {user.userName}
                          </td>
                          <td>
                            {user.userRole.map((role, idx) => (
                              <span
                                key={idx}
                                className="badge bg-light text-info fs-6 me-1"
                              >
                                {role}
                              </span>
                            ))}
                          </td>
                          <td className="text-center">
                            <Button
                              color="primary"
                              onClick={() => handleEdit(user.index)}
                              size="sm"
                            >
                              Edit
                            </Button>
                          </td>
                          <td className="text-center">
                            <Button
                              color="danger"
                              onClick={() => handleRemove(user.index)}
                              size="sm"
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default User;
