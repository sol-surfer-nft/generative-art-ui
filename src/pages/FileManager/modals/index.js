import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Label, Input } from 'reactstrap'

export const AddFileModal = ({
  isOpen,
  toggleModal,
  closeModal,
  onSubmit,
  centered = true
}) => {
  const [foldername, setFoldername] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    return () => resetModal()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors(null)
    setLoading(true)

    try {
      let response = await onSubmit(foldername)
      console.log('response:', response)
      setLoading(false)
      closeModal()
    }
    catch (e) {
      console.log('errors:', e)
      setErrors(e)
      setLoading(false)
    }
  }

  const resetModal = () => {
    setLoading(false)
    setErrors(null)
    setFoldername("")
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        resetModal()
        closeModal()
      }}
      centered={centered}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0">Add File</h5>
        <button
          type="button"
          onClick={closeModal}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">
        {errors && (
          <div className="error-container">
            <p style={{color:"rgba(225,0,0,.8)"}}>*{errors.toString()}</p>
          </div>
        )}

        {/* Add Folder form */}
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* Use Ref() to autoFocus and highlight and give default value */}
            <Input
              type="text"
              autoFocus
              value={foldername}
              onChange={e => setFoldername(e.target.value)}
              placeholer="Untitled Folder"
              className="form-control"
              id="modal-add-file-input"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-md" disabled={loading}>
              Add
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

AddFileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  centered: PropTypes.bool
}

export const AddFolderModal = ({
  isOpen,
  toggleModal,
  closeModal,
  onSubmit,
  centered = true
}) => {
  const [foldername, setFoldername] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    return () => resetModal()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors(null)
    setLoading(true)

    try {
      let response = await onSubmit(foldername)
      console.log('response:', response)
      setLoading(false)
      closeModal()
    }
    catch (e) {
      console.log('errors:', e)
      setErrors(e)
      setLoading(false)
    }
  }

  const resetModal = () => {
    setLoading(false)
    setErrors(null)
    setFoldername("")
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        resetModal()
        closeModal()
      }}
      centered={centered}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0">Add Folder</h5>
        <button
          type="button"
          onClick={closeModal}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">
        {errors && (
          <div className="error-container">
            <p style={{color:"rgba(225,0,0,.8)"}}>*{errors.toString()}</p>
          </div>
        )}

        {/* Add Folder form */}
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* Use Ref() to autoFocus and highlight and give default value */}
            <Input
              type="text"
              autoFocus
              value={foldername}
              onChange={e => setFoldername(e.target.value)}
              placeholer="Untitled Folder"
              className="form-control"
              id="modal-add-folder-input"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-md" disabled={loading}>
              Add
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

AddFolderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  centered: PropTypes.bool
}

export const RenameFileModal = ({
  isOpen,
  toggleModal,
  closeModal,
  onSubmit,
  centered = true
}) => {
  const [foldername, setFoldername] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    return () => resetModal()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors(null)
    setLoading(true)

    try {
      let response = await onSubmit(foldername)
      console.log('response:', response)
      setLoading(false)
      closeModal()
    }
    catch (e) {
      console.log('errors:', e)
      setErrors(e)
      setLoading(false)
    }
  }

  const resetModal = () => {
    setLoading(false)
    setErrors(null)
    setFoldername("")
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        resetModal()
        closeModal()
      }}
      centered={centered}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0">Rename File</h5>
        <button
          type="button"
          onClick={closeModal}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">
        {errors && (
          <div className="error-container">
            <p style={{color:"rgba(225,0,0,.8)"}}>*{errors.toString()}</p>
          </div>
        )}

        {/* Add Folder form */}
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* Use Ref() to autoFocus and highlight and give default value */}
            <Input
              type="text"
              autoFocus
              value={foldername}
              onChange={e => setFoldername(e.target.value)}
              placeholer="Untitled Folder"
              className="form-control"
              id="modal-add-file-input"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-md" disabled={loading}>
              Save
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

RenameFileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  centered: PropTypes.bool
}

export const RenameFolderModal = ({
  isOpen,
  toggleModal,
  closeModal,
  onSubmit,
  centered = true
}) => {
  const [foldername, setFoldername] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    return () => resetModal()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors(null)
    setLoading(true)

    try {
      let response = await onSubmit(foldername)
      console.log('response:', response)
      setLoading(false)
      closeModal()
    }
    catch (e) {
      console.log('errors:', e)
      setErrors(e)
      setLoading(false)
    }
  }

  const resetModal = () => {
    setLoading(false)
    setErrors(null)
    setFoldername("")
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        resetModal()
        closeModal()
      }}
      centered={centered}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0">Rename Folder</h5>
        <button
          type="button"
          onClick={closeModal}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">
        {errors && (
          <div className="error-container">
            <p style={{color:"rgba(225,0,0,.8)"}}>*{errors.toString()}</p>
          </div>
        )}

        {/* Add Folder form */}
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* Use Ref() to autoFocus and highlight and give default value */}
            <Input
              type="text"
              autoFocus
              value={foldername}
              onChange={e => setFoldername(e.target.value)}
              placeholer="Untitled Folder"
              className="form-control"
              id="modal-add-folder-input"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-md" disabled={loading}>
              Save
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

RenameFolderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  centered: PropTypes.bool
}