import PropTypes from "prop-types";
import React from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { userForgetPassword } from "../../slices/thunks";

// import images
// import profile from "../../assets/images/bg.png";
import logoLight from "../../assets/images/logo-light.png";
import side_image from "../../assets/images/login_image.jpg";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";

const ForgetPasswordPage = (props) => {
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      dispatch(userForgetPassword(values, props.history));
    },
  });

  const selectLayoutState = (state) => state.ForgetPassword;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    forgetError: state.forgetError,
    forgetSuccessMsg: state.forgetSuccessMsg,
  }));
  // Inside your component
  const { forgetError, forgetSuccessMsg } = useSelector(selectLayoutProperties);

  document.title = "Reset Password | DrukGreen - Hydropower Forecasting System";
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="login-sec">
        <div className="row m-0">
          <div className="col-md-8 p-0 vh-100">
            <img
              alt="side view"
              src={side_image}
              className="w-100 vh-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-md-4 d-flex align-items-center px-0">
            <div className="bg-white vh-100 px-2 w-100 pt-4">
              <div className="text-center mt-sm-5">
                <Link to="/" className="d-inline-block auth-logo">
                  <img src={logoLight} alt="Logo" height="70" />
                </Link>
              </div>

              <div className="text-center">
                <h2 className="mt-3 fs-5 fw-medium text-dark">
                  Hydropower Forecasting System <br />
                  Chhukha Dam
                </h2>
              </div>

              <div className="text-center mt-2">
                <h5 className="text-primary">Forgot Password?</h5>

                <lord-icon
                  src="https://cdn.lordicon.com/rhvddzym.json"
                  trigger="loop"
                  colors="primary:#0ab39c"
                  className="avatar-xl"
                  style={{ width: "120px", height: "120px" }}
                ></lord-icon>
              </div>

              <Alert
                className="border-0 alert-warning text-center mb-2 mx-2"
                role="alert"
              >
                Enter your email and instructions will be sent to you!
              </Alert>
              <div className="p-2">
                {forgetError && forgetError ? (
                  <Alert color="danger" style={{ marginTop: "13px" }}>
                    {forgetError}
                  </Alert>
                ) : null}
                {forgetSuccessMsg ? (
                  <Alert color="success" style={{ marginTop: "13px" }}>
                    {forgetSuccessMsg}
                  </Alert>
                ) : null}
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <div className="">
                    <Label className="form-label">Email</Label>
                    <Input
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      type="email"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email || ""}
                      invalid={
                        validation.touched.email && validation.errors.email
                          ? true
                          : false
                      }
                    />
                    {validation.touched.email && validation.errors.email ? (
                      <FormFeedback type="invalid">
                        <div>{validation.errors.email}</div>
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="text-center mt-4">
                    <button className="btn btn-success w-100" type="submit">
                      Send Reset Link
                    </button>
                  </div>
                </Form>
              </div>

              <div className="text-center">
                <p className="mb-0">
                  Wait, I remember my password...{" "}
                  <Link
                    to="/login"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    {" "}
                    Click here{" "}
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
