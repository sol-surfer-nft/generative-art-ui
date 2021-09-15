import React, { Component } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
} from "reactstrap"

// Import page component to plugin
import FileManager from '../FileManager'

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Welcome | SolSurfer Generative Art Platform</title>
          </MetaTags>
          <Container fluid>
            {/* <h4>Dashboard</h4>  */}

            <FileManager />
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard;
