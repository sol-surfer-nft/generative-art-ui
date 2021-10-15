/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import React, { useState, useEffect, Suspense, lazy } from "react"
import { useRecoilState } from 'recoil'
import { isAuthState } from './state/atoms'

import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
// import { useRecoilState } from 'recoil'

// User Pages
import Dashboard from "./pages/Dashboard"
// import Build from "./pages/Build"
// import FileManager from "./pages/FileManager"
// import Info from "./pages/Info"
// import Preview from "./pages/Preview"
// import Publish from "./pages/Publish"
import Welcome from './pages/Welcome'

// layouts Format
import HorizontalLayout from "./components/HorizontalLayout/"
// import { AuthRoute } from './web3/AuthRoute'

// Import scss
import "./assets/scss/theme.scss"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from "./helpers/AuthType/fakeBackend"
import { useWallet } from '@solana/wallet-adapter-react'
// import withSuspense from './hoc/withSuspense'

fakeBackend()

const App = props => {
  const [isAuth, setIsAuth] = useRecoilState(isAuthState)
  const { connected, wallet } = useWallet()
  // const { connected, wallet } = useWallet()

  useEffect(() => {
    console.log('connected:', connected)
    console.log('wallet:', wallet)
    if(connected) {
      console.log('setting isAuth true')
      setIsAuth(true)
    }
    else {
      console.log('setting isAuth false')
      setIsAuth(false)
    }
  }, [connected, wallet])

  const Layout = HorizontalLayout

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Layout>
            <Suspense fallback={<div className="page-content"></div>}>
              {/* Public Routes */}
              <Route exact path={"/welcome"} render={props => {
                return isAuth ? <Redirect to="/dashboard" /> : <Welcome {...props} />
              }} />
              
              {/* Auth routes */}
              <Route exact path={["/", "/dashboard"]} render={props => {
                return isAuth ? <Dashboard {...props} /> : <Redirect to={{pathname: "/welcome", state: { from: props.location }}} />
              }} />
              <Route exact path="/build" render={lazy(() => import("./pages/Build/"))} />
              <Route exact path="/preview" render={lazy(() => import("./pages/Preview/"))} />
              <Route exact path="/info" render={lazy(() => import("./pages/Info/"))} />
              <Route exact path="/publish" render={lazy(() => import("./pages/Publish/"))} />
              {/* <Route exact path="/profile" render={lazy(() => import ("./pages/Authentication/user-profile"))} /> */}
            </Suspense>
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
