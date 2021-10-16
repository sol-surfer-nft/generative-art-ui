import React, { useState, useEffect } from 'react'
import MetaTags from 'react-meta-tags';
import {
  Container, Col, Row, Card, CardBody, CardTitle, CardText, Spinner, Button, Input, Form, FormGroup
} from "reactstrap"
import { useRecoilState } from 'recoil'
import { attributesState } from '../../state/attributes.atoms'
// import classnames from "classnames"

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

const MAX_GEN = 20000

const Preview = () => {
  const [attributes, setAttributes] = useRecoilState(attributesState)

  const [numberToGenerate, setNumberToGenerate] = useState(1);
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string | null>(null)

  const [dimensions, setDimensions] = useState({height: 200, width: 200})
 
  const [generatedImages, setGeneratedImages] = useState<number[][]>([])

  const generateImages = async (reset = true) => {
    if(!numberToGenerate || numberToGenerate < 1 || numberToGenerate > MAX_GEN) {
      console.log('invalid # to generate')
      setErrors('Invalid number to generate')
      return;
    }

    if(reset) setGeneratedImages([])

    setErrors(null)
    setLoading(true)

    for(let i = 0; i < numberToGenerate; i++) {
      let imageIdArray: number[] = getRandomImageIdArray()
      console.log(imageIdArray)
      setGeneratedImages(prev => [...prev, imageIdArray])
    }

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  // return array of integers representing the trait id
  const getRandomImageIdArray = () => {
    let imageIdArray: number[] = []

    for(let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i]
      if(!attribute.traits || attribute.traits.length < 1) {
        imageIdArray[i] = -1;
      }
      let randomTraitIndex = Math.floor(Math.random() * attribute.traits.length)
      imageIdArray[i] = randomTraitIndex
    }

    return imageIdArray;
  }

  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Preview | SolSurfer Generative Art Platform</title>
        </MetaTags>
        <Container fluid>
          <h4>Preview</h4>

          {/* Start Page Layout... Row/Col Grid Structure */}

            {/* Attributes / Traits Sidebar */}


            {/* Preview: Canvas Renderer */}

          {/* Toolbar */}
          <div className="preview-toolbar">
            <Form onSubmit={(e: any) => {
              e.preventDefault()
              generateImages()
            }}>
              <FormGroup>

              <Input
                min={0}
                max={MAX_GEN}
                type="number"
                value={numberToGenerate}
                onChange={(e: any) => {
                  setNumberToGenerate(parseInt(e.target.value))
                }}
                style={{display:'inline-block'}}
              />
              <Button color="primary" onClick={() => generateImages()}>Generate {numberToGenerate} Random NFTs</Button>
              </FormGroup>
            </Form>
          </div>

          {loading ? (
            <div>Generating Images... <Spinner color="primary" /></div>
          ) : (
            <div className="grid-container">
              {/* <Row className="justify-content-center"> */}
                  {generatedImages.length < 1 && (
                    <Col xs="12" className="text-center">
                      <h4>No Images Generated</h4>
                      <p>Click the button above to generate some images</p>
                    </Col>
                  )}

                  {generatedImages.map((imageIdArray, index) => {
                        <p key={Math.random()}>{imageIdArray.toString()} [{imageIdArray.map(number => ` ${number},`)}]</p>
                    // <Col sm={6} key={`${index}-${imageIdArray[0] || 5}`}>
                    //   <Card className="p-1 border shadow-none" style={{padding: 40}}>
                    //     {/* <img src={imageIdArray.toString()} alt={`Generated Image ${index}: id(${imageIdArray.toString()})`} height={dimensions.height} width={dimensions.width} /> */}
                    //   </Card>
                    // </Col>
                  })}
              {/* </Row> */}
            </div>
          )}
        </Container>
      </div>
    </>
  )
}

export default Preview;