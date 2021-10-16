import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import MetaTags from 'react-meta-tags';
import { Container, Collapse, Input, Form, Col, Card } from "reactstrap"
import { attributesState } from '../../state/attributes.atoms'
// import DragDropTable from '../../resources/Tables/DragDropTables'
// import EditableTable from '../../resources/Tables/EditableTables'
import { AddTraitModal, AddTraitData } from './AddTraitModal'
import { nanoid } from 'nanoid'

/**
 * Build Page
 * 1. Order
 * - Allow user to create, edit, and order their attributes in a friendly list with multiple elements per item
 * - Allow user to add, edit, and remove traits from each of their attributes
 * --> Q) Do we need a toolbar here, or any sort of informational display components to aid the attribute/trait dipslay?
 * 2. Build
 * - Easily add new attributes, traits, and fill in necessary fields
 */
const initialFormState = {
  attributeName: "",
  attributeRarity: 0,
  attributeDesc: "",
}

const MAX_NAME_LENGTH = 50
const MAX_DESC_LENGTH = 150

const StyledContainer = styled(Container)`
  .add-attribute {
    margin-bottom: 20px;
  }
  .editable-attribute {
    display: flex;
    align-items: center;

    .name-input {
      flex: 1;
    }
    .rarity-input {

    }
  }

  /* Make Table? */
  .attribute-trait-text {
    margin-bottom: 6px;
    margin-top: 0;
  }
  .attribute-items-list {
    margin-top: 10;
    padding-left: 0;
    list-style: none;
  }
  .attribute-items-list-header {
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 20px;

    .attribute-item-body {
      flex: 1;
      margin-left: 15px;
    }
  }

  .page-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .page-header-title {
      flex: 1;
      margin-bottom: 0;
    }
    .page-header-button {

    }
  }
`

const initialModalData: ModalData = {
  type: "",
  id: "",
  name: "",
}
interface ModalData {
  type: "add-trait" | "edit-trait" | "add-attribute" | "edit-attribute" | "",
  id?: string
  name?: string
}

const BuildPage = () => {
  const [attributes, setAttributes] = useRecoilState(attributesState)
  const [openAttributes, setOpenAttributes] = useState<string[]>([])
  const [formActive, setFormActive] = useState(false)
  const [formData, setFormData] = useState(initialFormState)
  const [formLoading, setFormLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<string | null>(null)

  const [showModal, setShowModal] = useState(false)
  // const [modalData, setModalData] = useState<ModalData>(initialModalData)

  const [activeFormId, setActiveFormId] = useState("") // id of the attribute it is for

  const setOpen = (attributeId: string) => {
    console.log('setting open with id:', attributeId)
    if(!openAttributes.includes(attributeId)) {
      setOpenAttributes(prevAtt => [...prevAtt, attributeId])
    }
    else {
      setOpenAttributes(prevAtt => prevAtt.filter(att => att !== attributeId ))
    }
  }

  const toggleAddAttribute = () => {
    setFormActive(true)
  }

  const handleChange = (e: any) => {
    setFormData(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }))
  }

  // ToDo: Replace with react-hook-form
  const onFormSubmit = (e?: any) => {
    if(e) e.preventDefault()
    if(formLoading) return;
    setFormErrors(null)

    console.log('form data:', formData)
    // Validate fields
    if(!formData.attributeName)
      setFormErrors("Attribute Name required")
    else if(!formData.attributeRarity || formData.attributeRarity <= 0 || !Number(formData.attributeRarity))
      setFormErrors("Form rarity must be a number > 0")
    else {
      const newAttribute = {
        id: nanoid(),
        name: formData.attributeName,
        desc: formData.attributeDesc || undefined,
        rarity: formData.attributeRarity,
        traits: []
      }
      console.log('new attribute:', newAttribute)
      // submit form
      setFormLoading(true)

      try {
        // Update State: add attribute
        setAttributes(prevAttributes => ([
          ...prevAttributes,
          newAttribute
        ]))

        // Make Api Call
        fetch("http://localhost:3000/api/attributes/add", {
          method: "POST",
          // headers: {} // getHeaders()
          body: JSON.stringify(newAttribute)
        })

        // If failed, undo state change
        handleFormClickAway()
      }
      catch (err: any) {
        // If failed, undo state change
        setFormErrors(err)
        setFormLoading(false)
      }
    }
  }

  const handleFormClickAway = (e?: any) => {
    setFormActive(false)
    setFormData(initialFormState)
    setFormLoading(false)
    setFormErrors(null)
  }

  const handleFormKeyDown = (keycode: number) => {
    if(!keycode) return;
    switch(keycode) {
      case 27: // escape
        handleFormClickAway()
        break;
      case 13: // enter
        onFormSubmit()
        break;
      default:
        // keycode not found or cared about
        break;      
    }
  }

  const toggleAddTrait = (attributeId: string) => {
    setActiveFormId(attributeId)
    setShowModal(true)
  }

  const addTrait = (data: AddTraitData) => {
    console.log('adding trait with data:', data)

    if(!activeFormId) {
      console.log('error: active form id not found')
      return;
    }

    const foundAttribute = attributes.find(attribute => attribute.id === activeFormId)
    if(!foundAttribute) {
      console.log('could not find attribute')
      return;
    }

    const newTrait = {
      ...data,
      id: nanoid(6),
      file: data.file || null,
      order: data.order || foundAttribute.traits.length
    }

    // add the data to activeFormId
    setAttributes(prevAttributes => ([
      ...prevAttributes.map(attribute => {
        if(attribute.id === activeFormId) {
          return {
            ...attribute,
            traits: [
              ...attribute.traits,
              newTrait
            ]
          }
        }
        return attribute
      })
    ]))


    // cleanup
    closeModal();
  }

  const editTrait = (attributeId: string, traitId: string) => {
    console.log('edit trait not working yet')

    // toggle edit modal
  }

  const removeTrait = (attributeId: string, traitId: string) => {
    console.log('removing trait with id:', traitId)

    // remove the data from activeFormId
    setAttributes(prevAttributes => ([
      ...prevAttributes.map(attribute => {
        if(attribute.id === attributeId) {
          return {
            ...attribute,
            traits: attribute.traits.filter(trait => trait.id !== traitId)
          }
        }
        return attribute
      })
    ]))
  }

  const closeModal = () => {
    setShowModal(false)
    setActiveFormId("")
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Build | SolSurfer Generative Art Platform</title>
        </MetaTags>
        <StyledContainer fluid>

          <AddTraitModal
            isOpen={showModal} // && modalType === "add-trait"
            toggle={closeModal}
            addTrait={addTrait}
          />

          <header className="page-header">
            <h4 className="page-header-title">Build</h4>
            {!formActive && (
              <button
                type="button"
                className="btn btn-info block page-header-button"
                onClick={toggleAddAttribute}
                >
                <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                Add Attribute
              </button>
            )}
          </header>

          {formErrors && (
            <div className="error-container">
              <p className="error-text">{formErrors.toString()}</p>
            </div>
          )}

          {/* Add Attribute Form */}
          {/* Add Attribute Icon Button */}
          {formActive && (
            <Form className="add-attribute row row-cols-lg-auto g-3 align-items-center" onKeyDown={e => handleFormKeyDown(e.keyCode)} onSubmit={onFormSubmit}>
              <Col xs={12}>
                <label className="visually-hidden" htmlFor="attributeNameId">Username</label>
                <Input type="text" autoFocus className="form-control" value={formData.attributeName} onChange={handleChange} id="attributeNameId" placeholder="Name" name="attributeName" />
              </Col>

              <Col xs={12}>
                <label className="visually-hidden" htmlFor="attributeRarityId">Preference</label>
                <Input type="number" className="rarity-input" value={formData.attributeRarity} onChange={handleChange} name="attributeRarity" id="attributeRarityId" />
              </Col>

              <Col xs={12}>
                <button type="submit" disabled={formLoading} className="btn btn-primary add-attribute-button w-md">Add</button>
                <button type="button" disabled={formLoading} onClick={handleFormClickAway} className="btn btn-light add-attribute-button w-md">Cancel</button>
              </Col>
            </Form>
          )}

          <h6 style={{fontWeight: "bold", marginBottom: 8}}>Attributes</h6>

          <ul className="attribute-items-list">
            {/* Header List Item */}
            <li className="attribute-items-list-header">
              <p className="attribute-item-text" style={{fontWeight:"bold", paddingLeft:2}}>#</p>
              <div className="attribute-item-body">
                <p className="attribute-item-text" style={{fontWeight:"bold"}}>Name</p>
              </div>
              <p className="attribute-item-text" style={{fontWeight:"bold"}}>Traits</p>
            </li>
            {attributes.length === 0 && (
              <div style={{padding: "10px 20px"}}>
                <p>No Attributes Exist Yet. Click &apos;Add Attribute&apos; to get started!</p>
              </div>
            )}
            {attributes.map((attribute, index) => (
              <StyledAttribute key={attribute.id}>
                <Card>
                  <div className="attribute-item" onClick={() => setOpen(attribute.id)}>
                    <p className="attribute-item-text" style={{fontWeight:600}}>{index}.{" "}</p>
                    <div className="attribute-item-body">
                      <p className="attribute-item-text">{attribute.name}</p>
                    </div>
                    <p className="attribute-item-text">{attribute.traits.length}</p>
                  </div>
                </Card>
                <Collapse isOpen={openAttributes.includes(attribute.id)}>
                  <h6 className="attributes-item-header" style={{fontWeight:"bold",marginBottom:2,marginTop:5,marginLeft:40}}>Traits:</h6>
                  {attribute.traits.map((trait, index) => (
                    <div className="attribute-item-container" key={trait.id}>
                      <div className="attribute-index">
                        {/* vertical list with: index, delete trash icon button, edit button */}
                        <p style={{marginBottom:0, fontWeight: "bold"}}>{index}</p>
                        <button
                          type="button"
                          className="btn btn-outline-light btn-sm btn-small"
                          onClick={() => editTrait(attribute.id, trait.id)}
                        >
                          <i className="bx bx-pencil font-size-16 align-middle"></i>{" "}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-light btn-sm btn-small"
                          onClick={() => removeTrait(attribute.id, trait.id)}
                        >
                          <i className="bx bx-trash-alt font-size-16 align-middle"></i>{" "}
                        </button>
                      </div>
                      <div className="attribute-trait-item">
                        <p className="attribute-trait-text">Name: {trait.name}</p>
                        {trait.desc && <p className="attribute-trait-text">Desc: {trait.desc}</p>}
                        <p className="attribute-trait-text">Rarity: {trait.rarity}</p>
                        {trait.order && <p className="attribute-trait-text">Order: {trait.order}</p>}
                        {trait.file && <p className="attribute-trait-text">File Type: {trait.file.fileType || "none"}</p>}
                        {trait.file && <p className="attribute-trait-text">Url: {trait.file.url || "none"}</p>}
                      </div>
                      <div className="attribute-left">
                        {trait.file && <img src={trait.file.toString()} alt="trait-image" height={150} width={150} />}
                      </div>
                    </div>
                  ))}
                  {attribute.traits.length === 0 && (
                    <div className="attribute-item-container">
                      <p style={{marginLeft: 75, marginTop: 10}}>No Traits Found</p>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    className="btn btn-info"
                    style={{marginBottom: 10, marginTop: 10}}
                    onClick={() => toggleAddTrait(attribute.id)}
                  >
                    <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                    Add Trait
                  </button>
                </Collapse>
              </StyledAttribute>
            ))}
          </ul>

          {/* <h4 style={{marginTop: 80}}>Order</h4> */}

          {/* Attributes List */}
          {/* <DragDropTable /> */}

          {/* Second Option */}
          {/* <EditableTable /> */}
        </StyledContainer>
      </div>
    </React.Fragment>
  )
}

const StyledAttribute = styled.li`
  background: #fff;
  border-radius: 10px;
  margin-bottom: 20px;

  .attribute-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    padding-bottom: 0;
    border-bottom: 1px solid rgba(0,0,0,.15);
    cursor: pointer;

    .attribute-item-body {
      flex: 1;
      margin-left: 12px;
    }
    .attribute-item-text {
      /* margin-bottom: 0; */

    }
  }
  .attribute-item-container {
    display: flex;
    /* align-items: center; */
    border-bottom: 1px solid rgba(0,0,0,.15);
    margin-right: 20px;
    margin-left: 20px;
  }
  .attribute-index {
    padding-top: 12px;
    margin-left: 10px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    * {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .attribute-trait-item {
    flex: 1;
    padding: 10px 20px;
    /* cursor: pointer; */
  }
  .attributes-item-header {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 10px;
  }
`

export default BuildPage