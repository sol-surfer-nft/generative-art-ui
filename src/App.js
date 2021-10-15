import PropTypes from 'prop-types'
import React, { useState, useEffect, Suspense, lazy } from "react"

import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
// import { useRecoilState } from 'recoil'
import { WalletConnector } from './web3/WalletConnector'

// User Pages
import Dashboard from "./pages/Dashboard"
import Build from "./pages/Build"
import FileManager from "./pages/FileManager"
import Info from "./pages/Info"
import Preview from "./pages/Preview"
import Publish from "./pages/Publish"
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

fakeBackend()

const App = props => {
  const [isAuth, setIsAuth] = useState(false); // default to 'True' until Web3 Auth is added
  const { connected, wallet } = useWallet()

  useEffect(() => {
    if(connected && wallet) {
      setIsAuth(true)
    }
  }, [connected, wallet])

  const Layout = HorizontalLayout

  return (
    <WalletConnector>
        <Layout>
      <Router>
          {/* <Suspense fallback={<div className="page-content"></div>}> */}
            <Switch>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            {/* Public Routes */}
                
                {isAuth ? (
                  <>
                    <Route exact path={["/", "/dashboard"]} component={Dashboard} />
                    <Route exact path="/build" component={Build} />
                    <Route exact path="/preview" component={Preview} />
                    <Route exact path="/info" component={Info} />
                    <Route exact path="/publish" component={Publish} />
                  </>
                ) : <><Route exact path={["/", "/welcome"]} component={Welcome} /><Redirect to="/welcome" /></>}
            </Switch>
          {/* </Suspense> */}
      </Router>
        </Layout>
    </WalletConnector>
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
