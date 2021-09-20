import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import MetaTags from 'react-meta-tags';
import { Container, Collapse } from "reactstrap"
import { attributesState } from '../../state/attributes.atoms'
import DragDropTable from '../../resources/Tables/DragDropTables'
import EditableTable from '../../resources/Tables/EditableTables'

/**
 * Order Page
 * - Allow user to create, edit, and order their attributes in a friendly list with multiple elements per item
 * - Allow user to add, edit, and remove traits from each of their attributes
 * --> Q) Do we need a toolbar here, or any sort of informational display components to aid the attribute/trait dipslay?
 */
const OrderPage = props => {
  const [attributes, setAttributes] = useRecoilState(attributesState)
  const [openAttributes, setOpenAttributes] = useState([])

  const setOpen = (attributeId) => {
    console.log('setting open with id:', attributeId)
    if(!openAttributes.includes(attributeId)) {
      setOpenAttributes(prevAtt => [...prevAtt, attributeId])
    }
    else {
      setOpenAttributes(prevAtt => prevAtt.filter(att => att !== attributeId ))
    }
  }

  return (
    <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Order | SolSurfer Generative Art Platform</title>
          </MetaTags>
          <Container fluid>
            <h4 style={{marginBottom: 20}}>Attributes</h4>

            <ul className="attribute-items-list">
              {attributes.map(attribute => (
                <StyledAttribute key={attribute.id}>
                  <div className="attribute-item" onClick={() => setOpen(attribute.id)}>
                    <p>Name: {attribute.name}</p>
                    <p># traits: {attribute.traits.length}</p>
                  </div>
                  <Collapse isOpen={openAttributes.includes(attribute.id)}>
                    {/* <p className="attributes-item-header">Traits:</p> */}
                    {attribute.traits.map(trait => (
                      <div className="attribute-trait-item" key={trait.id}>
                        <p>Name: {trait.name}</p>
                        {trait.desc && <p>Desc: {trait.desc}</p>}
                        <p>Rarity: {trait.rarity}</p>
                        <p>File Type: {trait.fileType}</p>
                        <p>Url: {trait.url}</p>
                      </div>
                    ))}
                  </Collapse>
                </StyledAttribute>
              ))}
            </ul>

            <h4 style={{marginTop: 80}}>Order</h4>

            {/* Attributes List */}
            <DragDropTable />

            {/* Second Option */}
            <EditableTable />
          </Container>
        </div>
      </React.Fragment>
  )
}

const StyledAttribute = styled.div`
  .attribute-item {
    padding: 10px 20px;
    padding-bottom: 0;
    border-bottom: 1px solid rgba(0,0,0,.15);
    cursor: pointer;
  }
  .attribute-trait-item {
    padding: 10px 20px;
    margin-left: 20px;
    margin-right: 20px;
    border-bottom: 1px solid rgba(0,0,0,.15);
    cursor: pointer;
  }
  .attributes-item-header {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 10px;
  }
`

export default OrderPage