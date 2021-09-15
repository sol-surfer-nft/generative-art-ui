import PropTypes from 'prop-types'
import React, { useState } from "react"

import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"

// Profile
import UserProfile from "./pages/Authentication/user-profile"

// Authentication related pages
import Login from "./pages/Authentication/Login"
import Logout from "./pages/Authentication/Logout"
import Register from "./pages/Authentication/Register"
import ForgotPassword from "./pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "./pages/Dashboard/index"

// layouts Format
import HorizontalLayout from "./components/HorizontalLayout/"
// import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from "./helpers/AuthType/fakeBackend"

// Activating fake backend
fakeBackend()

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = props => {
  const [isAuth, setIsAuth] = useState(true);

  const Layout = HorizontalLayout

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Layout>
            {/* Public Routes */}
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/register" component={Register} />


            {/* Auth Protected Routes */}
            {isAuth && (
              <>
                <Route exact path={["/", "/dashboard"]} component={Dashboard} />
                <Route exact path="/profile" component={UserProfile} />
                {/* <Redirect exact from="/" to="/dashboard" /> */}
              </>
            )}

          </Layout>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
