import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"
import { RecoilRoot } from 'recoil'
import { WalletConnector } from './web3/WalletConnector'
import "react-contexify/dist/ReactContexify.css";

import store from "./store"

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <WalletConnector>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </WalletConnector>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()
