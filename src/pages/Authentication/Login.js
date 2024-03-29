import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"

// actions
import { loginUser, apiError, socialLogin } from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo.svg"

//Import config
import { google } from "../../config"

const Login = props => {
  const dispatch = useDispatch()

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    dispatch(loginUser(values, props.history))
  }

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    }
  }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Generative NFT Platform by SolSurfer</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to SolSurfer.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          value="admin@themesbrand.com"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          value="123456"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          {/*<li className="list-inline-item">*/}
                          {/*  <TwitterLogin*/}
                          {/*    loginUrl={*/}
                          {/*      "http://localhost:4000/api/v1/auth/twitter"*/}
                          {/*    }*/}
                          {/*    onSuccess={this.twitterResponse}*/}
                          {/*    onFailure={this.onFailure}*/}
                          {/*    requestTokenUrl={*/}
                          {/*      "http://localhost:4000/api/v1/auth/twitter/revers"*/}
                          {/*    }*/}
                          {/*    showIcon={false}*/}
                          {/*    tag={"div"}*/}
                          {/*  >*/}
                          {/*    <a*/}
                          {/*      href=""*/}
                          {/*      className="social-list-item bg-info text-white border-info"*/}
                          {/*    >*/}
                          {/*      <i className="mdi mdi-twitter"/>*/}
                          {/*    </a>*/}
                          {/*  </TwitterLogin>*/}
                          {/*</li>*/}
                          <li className="list-inline-item">
                            <GoogleLogin
                              clientId={google.CLIENT_ID}
                              render={renderProps => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-google" />
                                </Link>
                              )}
                              onSuccess={googleResponse}
                              onFailure={() => { }}
                            />
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} SolSurfer. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by SolSurfer
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
