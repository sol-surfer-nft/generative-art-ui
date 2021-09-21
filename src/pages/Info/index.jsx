import React from 'react'
import styled from 'styled-components'
import { Container } from 'reactstrap'
import MetaTags from 'react-meta-tags'

const StyledContainer = styled(Container)`

`

const InfoPage = () => {

  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Info | SolSurfer Generative Art Platform</title>
        </MetaTags>
        <StyledContainer fluid>
          <h4>Info</h4>
        </StyledContainer>
      </div>
    </>
  )
}

export default InfoPage;