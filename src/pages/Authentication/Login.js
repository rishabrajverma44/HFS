import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Label,
  Form,
  FormFeedback,
  Alert,
  Button,
  Spinner,
  Row,
  Col,
  CardHeader,
  CardBody,
} from "reactstrap";
import { CaptchaBox, validateCaptcha, reloadCaptcha } from "react-captcha-lite";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser, resetLoginFlag } from "../../slices/thunks";
import logoLight from "../../assets/images/logo-light.png";
import side_image from "../../assets/images/login_image.jpg";
import { createSelector } from "reselect";
import { ToastContainer, toast } from "react-toastify";
import { RefreshCcw } from "feather-icons-react";
import Slideshow from "./Slideshow";

const Login = (props) => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state;
  const loginpageData = createSelector(selectLayoutState, (state) => ({
    user: state.Account.user,
    error: state.Login.error,
    loading: state.Login.loading,
    errorMsg: state.Login.errorMsg,
  }));
  const { user, error, loading, errorMsg } = useSelector(loginpageData);

  const [passwordShow, setPasswordShow] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.email || "admin@themesbrand.com",
      password: user?.password || "123456",
      user_captcha_input: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      user_captcha_input: Yup.string().required("Captcha is required"),
    }),
    onSubmit: async (values) => {
      if (validateCaptcha(values.user_captcha_input)) {
        const valuesNew = {
          email: validation.values.email,
          password: validation.values.password,
        };
        dispatch(loginUser(valuesNew, props.router.navigate));
      } else {
        toast.error("Captcha validation failed, please try again");
        validation.setFieldError(
          "user_captcha_input",
          "Captcha validation failed"
        );
      }
    },
  });

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => dispatch(resetLoginFlag()), 3000);
    }
  }, [dispatch, errorMsg]);

  useEffect(() => {
    const refreshButton = document.getElementById("captcha_lite_reload_btn");
    if (refreshButton) {
      refreshButton.style.display = "none";
    }

    const captchaContainerImg = document.getElementById("captcha_lite_canvas");
    if (captchaContainerImg) {
      captchaContainerImg.style.width = "200px";
      captchaContainerImg.style.height = "35px";
      captchaContainerImg.style.marginTop = "15px";
      captchaContainerImg.style.marginBottom = "5px";
      captchaContainerImg.style.objectFit = "cover";
      captchaContainerImg.style.border = "0px";
      captchaContainerImg.style.background = "none";
    }
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="">
        <div className="row m-0">
          <div className="col-md-8">
            <Slideshow />

            {/* <img
              alt="side view"
              src={side_image}
              className="w-100 vh-100"
              style={{ objectFit: "cover" }}
            /> */}
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
                <h5 className="text-primary">Welcome Back!</h5>
              </div>

              {error && <Alert color="danger">{error}</Alert>}

              <div className="p-2 mt-4">
                <Form onSubmit={validation.handleSubmit}>
                  <div className="mb-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email}
                      invalid={
                        validation.touched.email && !!validation.errors.email
                      }
                    />
                    <FormFeedback>{validation.errors.email}</FormFeedback>
                  </div>

                  <div className="mb-3">
                    <div className="float-end">
                      <Link to="/forgot-password" className="text-muted">
                        Forgot password?
                      </Link>
                    </div>
                    <Label htmlFor="password-input">Password</Label>
                    <div className="position-relative mb-3">
                      <Input
                        name="password"
                        type={passwordShow ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.password}
                        invalid={
                          validation.touched.password &&
                          !!validation.errors.password
                        }
                      />
                      <FormFeedback>{validation.errors.password}</FormFeedback>
                      <button
                        className="btn btn-link position-absolute end-0 me-1 top-0 text-decoration-none text-muted"
                        type="button"
                        id="password-addon"
                        onClick={() => setPasswordShow(!passwordShow)}
                      >
                        <i className="ri-eye-fill align-middle"></i>
                      </button>
                    </div>
                  </div>

                  <div className="captcha-container mb-3 mx-2">
                    <Row className="captcha-box bg-light justify-content-center align-items-center py-2">
                      <Col md={3} className="d-flex justify-content-center">
                        <CaptchaBox />
                      </Col>
                      <Col md={1} className="d-flex justify-content-center">
                        <Button
                          color="primary"
                          className="p-1 m-1"
                          onClick={reloadCaptcha}
                        >
                          <RefreshCcw size="16" />
                        </Button>
                      </Col>
                      <Col md={8} className="">
                        <Input
                          name="user_captcha_input"
                          type="text"
                          placeholder="Enter Captcha Value"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.user_captcha_input}
                          invalid={
                            validation.touched.user_captcha_input &&
                            !!validation.errors.user_captcha_input
                          }
                        />
                        <FormFeedback>
                          {validation.errors.user_captcha_input}
                        </FormFeedback>
                      </Col>
                    </Row>
                  </div>

                  <div className="mt-4">
                    <Button
                      color="success"
                      className="w-100"
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? <Spinner size="sm" className="me-2" /> : null}
                      Sign In
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
