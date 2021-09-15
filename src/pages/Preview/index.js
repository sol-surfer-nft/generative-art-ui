import React from 'react'
import MetaTags from 'react-meta-tags';
import {
  Container,
} from "reactstrap"

const Preview = props => {

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Preview | SolSurfer Generative Art Platform</title>
        </MetaTags>
        <Container fluid>
          <h4>Preview</h4> 

        </Container>
      </div>
    </React.Fragment>
  )
}

export default Preview;