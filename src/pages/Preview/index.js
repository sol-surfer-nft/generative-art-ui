import React from 'react'
import MetaTags from 'react-meta-tags';
import {
  Container,
} from "reactstrap"

/**
 * NFT "Preview" Page Component
 * - Display HTML5 Canvas rendering of the current NFT output from the user's project
 *    - Should take up most of the page... 75% large screens, 100% on small screens
 * - Display a concise overview of the user's current attributes, and the traits associated with those attributes
 *    - Should feel like a sidebar... 25% on large screens, 100% on small screens, but BENEATH the main preview aka user can scroll down to browse
 *    - Thinking it should take the form of a list. Similar to the folder/file sidebar structure in the "Home" page component
 * - Toolbar to allow user to easily test our their code.
 *    - i.e. "Generate Random NFT", "Calculate total unique variations possible", "Export PDF with trait rarities by attribute"
 *    - Can be a bit flexible here, layout-wise. Maybe it goes above the preview screen, maybe on the far right or left of the screen.
 */
const Preview = props => {

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Preview | SolSurfer Generative Art Platform</title>
        </MetaTags>
        <Container fluid>
          <h4>Preview</h4> 

          {/* Start Page Layout... Row/Col Grid Structure */}

            {/* Attributes / Traits Sidebar */}


            {/* Preview: Canvas Renderer */}


        </Container>
      </div>
    </React.Fragment>
  )
}

export default Preview;