/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { fileBrowserState, fileTreeSelector, rootFoldersSelector, fileTreeState } from '../../state/filesystem'
import {
  Card,
  CardBody,
  Col,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Form,
  Row,
  UncontrolledDropdown,
} from "reactstrap"
import { useContextMenu } from "react-contexify";
import classNames from "classnames"

const StyledFolderCard = styled(Card)`
  cursor: pointer;

  &.active-item-card.border {
    border: 1px solid #556ee6 !important;
  }

  &:hover {
    .file-card-title {
      text-decoration: underline;
    }
  }
`
const StyledFileCard = styled(Card)`
  cursor: pointer;

  &.active-item-card.border {
    border: 1px solid #556ee6 !important;
  }

  &:hover {
    .file-card-title {
      text-decoration: underline;
    }
  }
`
const StyledPathName = styled.div`
  .path-item {
    display: inline-block;
    cursor: pointer;
    padding: 5px 1px;
    border-radius: 3px;

    &:hover {
      background: rgba(33,33,33,.05);
    }
  }
`

// file: id, name, file, Gb

const FOLDER_MENU_ID = "folder-menu-id"
const FILE_MENU_ID = "file-menu-id"

let timer;

const FileList = ({
  modal,
  toggleModal
}) => {
  // const [folders, setFolders] = useRecoilState(foldersState)
  const [fileBrowser, setFileBrowser] = useRecoilState(fileBrowserState)
  // const files = useRecoilValue(filesState)
  const currentFileTree = useRecoilValue(fileTreeSelector)
  const [fileTree, setFileTree] = useRecoilState(fileTreeState)
  const [folders, setFolders] = useRecoilState(rootFoldersSelector)
  
  const { show } = useContextMenu();

  const [fileSearch, setFileSearch] = useState("")
  const [selectedItem, setSelectedItem] = useState("") // id of file or folder selected

  useEffect(() => {

    return () => reset()
  }, [])

  useEffect(() => {
    console.log("file tree:", currentFileTree)
  }, [currentFileTree])

  // const onClickHandler = (event) => {
  //   clearTimeout(timer);
  //   if (event.detail === 1) {
  //     timer = setTimeout(onClick, 200)
  //   } else if (event.detail === 2) {
  //     onDoubleClick()
  //   }
  // }

  const handleSearchChange = (e) => setFileSearch(e.target.value)

  const onFileCardClick = (fileId, fileName, detail) => {
    clearTimeout(timer);
    console.log('clicked file card with id:', fileId)
    setSelectedItem(fileId)

    if(detail === 1) {
      timer = setTimeout(() => null, 200)
    }
    else if(detail == 2) {
      onDoubleClick(fileId, fileName)
    }
    // Open modal? Open containing files?
  }

  const onFolderCardClick = (folderId, folderName, detail) => {
    clearTimeout(timer);
    console.log('clicked folder card with id:', folderId)
    setSelectedItem(folderId)

    if(detail === 1) {
      timer = setTimeout(() => null, 200)
    }
    else if (detail === 2) {
      onDoubleClick(folderId, folderName)
    }
    // Open modal? Open containing files?
  }

  const onDoubleClick = (id, name) => {
    // add extension to path (or derive full path)
    addToFilePath(name)
  }

  const removeFolder = folderId => {
    setFolders(prevFolders => prevFolders.filter(folder => folder.id !== folderId))
  }

  function displayMenu(e, id, MENU_ID = FILE_MENU_ID){
    // console.log('display menu:', e, 'for folder with id:', id)
    // put whatever custom logic you need
    // you can even decide to not display the Menu
    show(e, { id: MENU_ID, props: { id } });
  }

  const openFile = (fileId) => {
    console.log('openFile not implemented yet')
  }

  const editFile = (fileId) => {
    console.log('editFile not implemented yet')
  }

  const renameFile = (fileId) => {
    console.log('renameFile not implemented yet')
    toggleModal("rename-file")
  }

  const addToFilePath = (extension) => {
    if(extension.includes("/")) {
      console.log('error: extension includes "/"')
      return;
    }

    setFileBrowser(prev => ({
      ...prev,
      path: prev.path + "/" + extension
    }))
  }

  const reset = () => {
    setSelectedItem("")
    setFileSearch("")
  }

  const handlePathClick = pathname => {
    // set path state to the path specified (folder)
    let pathArray = fileBrowser.path.split("/")
    let foundPathIndex = pathArray.indexOf(pathname)
    let foundPath = pathArray[foundPathIndex]
    console.log('found path:', foundPath)
    let keepPath = pathArray.slice(0, foundPathIndex + 1)
    let newPath = keepPath.join('/')
    console.log('new path:', newPath)

    setFileBrowser(prevBrowser => ({
      ...prevBrowser,
      folder: true, // unless file?
      path: newPath
    }))
  }

  return (
    <React.Fragment>

      {/* Files List Header */}
      <div>
        <Row className="mb-3">
          <Col xl={3} sm={6}>
            <StyledPathName className="mt-2">
              <h5>{fileBrowser.path.split("/").map(pathname => (
                <>
                <span key={pathname} onClick={() => handlePathClick(pathname)} className="path-item">{pathname}</span>
                <span>/</span>
                </>
              ))}</h5>
            </StyledPathName>
          </Col>
          <Col xl={9} sm={6}>
            <Form className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
              {/* Files List Header */}
              <div className="search-box mb-2 me-2">
                <div className="position-relative">
                  <input
                    className="form-control bg-light border-light rounded"
                    type="text"
                    placeholder="Search..."
                    value={fileSearch}
                    onChange={handleSearchChange}
                  />
                  <i className="bx bx-search-alt search-icon"></i>
                </div>
              </div>

              <UncontrolledDropdown className="mb-0" direction="right">
                <DropdownToggle
                  color="white"
                  className="btn btn-link text-muted mt-n2"
                >
                  <i className="mdi mdi-dots-vertical font-size-20"></i>
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem className="dropdown-item">
                    Share Files
                  </DropdownItem>
                  <DropdownItem className="dropdown-item">
                    Share with me
                  </DropdownItem>
                  <DropdownItem className="dropdown-item">
                    <div onClick={e => console.log(e)}>
                      Other Actions
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Form>
          </Col>
        </Row>
      </div>

      {/* Files Grid */}
      <div>
        <Row>
          {fileSearch && folders.filter(folder => folder.name.toLowerCase().includes(fileSearch.toLowerCase())).map(folder => (
            <Col xl={4} sm={6} key={folder.id}>
              <StyledFolderCard
                className={classNames("shadow-none border", { "active-item-card": selectedItem === folder.id })}
                onClick={(e) => onFolderCardClick(folder.id, folder.name, e.detail)}
                onContextMenu={(e) => displayMenu(e, folder.id, FOLDER_MENU_ID)}
              >
                <CardBody className="p-3">
                  <div className="folder-card-inner">
                    <div className="float-end ms-2">
                      <UncontrolledDropdown className="mb-2" direction="left">
                        <DropdownToggle
                          color="white"
                          className="btn btn-link text-muted mt-n2"
                        >
                          <i className="mdi mdi-dots-horizontal"></i>
                        </DropdownToggle>

                        <DropdownMenu>
                          <DropdownItem className="dropdown-item" onClick={() => openFile(folder.id)}>
                            Open
                          </DropdownItem>
                          <DropdownItem className="dropdown-item" onClick={() => editFile(folder.id)}>
                            Edit
                          </DropdownItem>
                          <DropdownItem className="dropdown-item" onClick={() => renameFile(folder.id)}>
                            Rename
                          </DropdownItem>
                          <div className="dropdown-divider"></div>
                          <DropdownItem className="dropdown-item" onClick={() => removeFolder(folder.id)}>
                            Remove
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    <div className="avatar-xs me-3 mb-3">
                      <div className="avatar-title bg-transparent rounded">
                        <i className="bx bxs-folder font-size-24 text-warning"></i>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="overflow-hidden me-auto">
                        <h5 className="font-size-14 text-truncate mb-1 file-card-title">
                          <Link to="#" className="text-body">
                            {folder.name}
                          </Link>
                        </h5>
                        <p className="text-muted text-truncate mb-0">
                          {folder.files.length} Files
                        </p>
                      </div>
                      <div className="align-self-end ms-2">
                        <p className="text-muted mb-0">{folder.files[0]?.gb || "2"}GB</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </StyledFolderCard>
            </Col>
          ))}

          {/* Files Listing */}
          {/* {fileSearch && files.filter(file => file.name.toLowerCase().includes(fileSearch.toLowerCase())).map(file => (
            <Col xl={4} sm={6} key={file.id}>
              <StyledFileCard
                className={classNames("shadow-none border", { "active-item-card": selectedItem === file.id })}
                onClick={(e) => onFileCardClick(file.id, file.name, e.detail)}
                onContextMenu={(e) => displayMenu(e, file.id, FILE_MENU_ID)}
              >
                <CardBody className="p-3">
                  <div className="">
                    <div className="float-end ms-2">
                      <UncontrolledDropdown className="mb-2" direction="left">
                        <DropdownToggle
                          color="white"
                          className="btn btn-link text-muted mt-n2"
                        >
                          <i className="mdi mdi-dots-horizontal"></i>
                        </DropdownToggle>

                        <DropdownMenu>
                          <DropdownItem className="dropdown-item" onClick={() => openFile(file.id)}>
                            Open
                          </DropdownItem>
                          <DropdownItem className="dropdown-item" onClick={() => editFile(file.id)}>
                            Edit
                          </DropdownItem>
                          <DropdownItem className="dropdown-item" onClick={() => renameFile(file.id)}>
                            Rename
                          </DropdownItem>
                          <div className="dropdown-divider"></div>
                          <DropdownItem className="dropdown-item" onClick={() => removeFolder(file.id)}>
                            Remove
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    <div className="avatar-xs me-3 mb-3">
                      <div className="avatar-title bg-transparent rounded">
                        <i className="bx bxs-spreadsheet font-size-24 text-info"></i>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="overflow-hidden me-auto">
                        <h5 className="font-size-14 text-truncate mb-1 file-card-title">
                          <Link to="#" className="text-body">
                            {file.name}
                          </Link>
                        </h5>
                      </div>
                      <div className="align-self-end ms-2">
                        <p className="text-muted mb-0">{file.gb}GB</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </StyledFileCard>
            </Col>
          ))} */}
          {!currentFileTree.folders && !currentFileTree.files && (
            <Card style={{padding:20}}>
              <p style={{textAlign:'center', marginBottom: 0}}>None of your files or folders were found</p>
            </Card>
          )}

          {!fileSearch && currentFileTree.folders?.map(folder => (
            <Col xl={4} sm={6} key={folder.id}>
              <StyledFolderCard
                className={classNames("shadow-none border", { "active-item-card": selectedItem === folder.id })}
                onClick={(e) => onFolderCardClick(folder.id, folder.name, e.detail)}
                onContextMenu={(e) => displayMenu(e, folder.id, FOLDER_MENU_ID)}
              >
                <CardBody className="p-3">
                  <div className="">
                    <div className="float-end ms-2">
                      <UncontrolledDropdown className="mb-2" direction="left">
                        <DropdownToggle
                          color="white"
                          className="btn btn-link text-muted mt-n2"
                        >
                          <i className="mdi mdi-dots-horizontal"></i>
                        </DropdownToggle>

                        <DropdownMenu>
                          <DropdownItem className="dropdown-item" onClick={() => openFile(folder.id)}>
                            Open
                          </DropdownItem>
                          <DropdownItem className="dropdown-item" onClick={() => editFile(folder.id)}>
                            Edit
                          </DropdownItem>
                          <DropdownItem className="dropdown-item" onClick={() => renameFile(folder.id)}>
                            Rename
                          </DropdownItem>
                          <div className="dropdown-divider"></div>
                          <DropdownItem className="dropdown-item" onClick={() => removeFolder(folder.id)}>
                            Remove
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    <div className="avatar-xs me-3 mb-3">
                      <div className="avatar-title bg-transparent rounded">
                        <i className="bx bxs-folder font-size-24 text-warning"></i>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="overflow-hidden me-auto">
                        <h5 className="font-size-14 text-truncate mb-1 file-card-title">
                          <Link to="#" className="text-body">
                            {folder.name}
                          </Link>
                        </h5>
                        <p className="text-muted text-truncate mb-0">
                          {folder.files.length} Files
                        </p>
                      </div>
                      <div className="align-self-end ms-2">
                        <p className="text-muted mb-0">{folder.files[0]?.gb || "2"}GB</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </StyledFolderCard>
            </Col>
          ))}

          {!fileSearch && currentFileTree.files?.map(file => (
            <Col xl={4} sm={6} key={file.id}>
              <StyledFileCard
                className={classNames("shadow-none border", { "active-item-card": selectedItem === file.id })}
                onClick={(e) => onFileCardClick(file.id, file.name, e.detail)}
                onContextMenu={(e) => displayMenu(e, file.id, FILE_MENU_ID)}
              >
                <CardBody className="p-3">
                  <div className="">
                    <div className="float-end ms-2">
                      <UncontrolledDropdown className="mb-2" direction="left">
                        <DropdownToggle
                          color="white"
                          className="btn btn-link text-muted mt-n2"
                        >
                          <i className="mdi mdi-dots-horizontal"></i>
                        </DropdownToggle>

                        <DropdownMenu>
                          <DropdownItem className="dropdown-item" onClick={() => openFile(file.id)}>
                            Open
                          </DropdownItem>
                          <DropdownItem className="dropdown-item" onClick={() => editFile(file.id)}>
                            Edit
                          </DropdownItem>
                          <DropdownItem className="dropdown-item" onClick={() => renameFile(file.id)}>
                            Rename
                          </DropdownItem>
                          <div className="dropdown-divider"></div>
                          <DropdownItem className="dropdown-item" onClick={() => removeFolder(file.id)}>
                            Remove
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    <div className="avatar-xs me-3 mb-3">
                      <div className="avatar-title bg-transparent rounded">
                        <i className="bx bxs-spreadsheet font-size-24 text-info"></i>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="overflow-hidden me-auto">
                        <h5 className="font-size-14 text-truncate mb-1 file-card-title">
                          <Link to="#" className="text-body">
                            {file.name}
                          </Link>
                        </h5>
                        <p className="text-muted text-truncate mb-0">
                          {file.file} Files
                        </p>
                      </div>
                      <div className="align-self-end ms-2">
                        <p className="text-muted mb-0">{file.Gb}GB</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </StyledFileCard>
            </Col>
          ))}
        </Row>
      </div>
    </React.Fragment>
  )
}

export default FileList
