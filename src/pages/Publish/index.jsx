import React from 'react'
import styled from 'styled-components'
import MetaTags from 'react-meta-tags'
import { Container } from 'reactstrap'

const StyledContainer = styled(Container)`

`

const PublishPage = () => {

  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Publish | SolSurfer Generative Art Platform</title>
        </MetaTags>

        <StyledContainer fluid>
          <h4>Publish</h4>
        </StyledContainer>
      </div>
    </>
  )
}

export default PublishPage