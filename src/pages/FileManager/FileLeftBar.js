/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilState } from 'recoil'
import { foldersState, filesState } from '../../atoms'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Collapse,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledAlert,
  UncontrolledDropdown,
} from "reactstrap"
import { nanoid } from 'nanoid'
import {
  Menu,
  Item,
  Separator,
  useContextMenu
} from "react-contexify";

const CONTEXT_MENU_ID = "menu-id";

const StyledFile = styled.li`
  &:hover {
    text-decoration: underline;
  }
`
const StyledFolder = styled.li`
  cursor: pointer;
`

// file: id, name, file, Gb
const FileRightBar = () => {
  const [openFolders, setOpenFolders] = useState([])

  const [folders, setFolders] = useRecoilState(foldersState)
  const [files, setFiles] = useRecoilState(filesState)

  const { show } = useContextMenu({
    id: CONTEXT_MENU_ID
  });

  const toggle = () => setIsOpen(!isOpen)

  const addFolder = () => setFolders([
    ...folders,
    {
      id: nanoid(),
      name: "Untitled",
      files: []
    }
  ])

  const addFile = fileId => {
    console.log("not implemented yet")
  }

  function handleItemClick({ event, props, triggerEvent, data }){
    // console.log(event, props, triggerEvent, data );
    console.log("props:", props)
    switch(event.currentTarget.id) {
      case "open":
        openFile(props.id);
        break;
      case "edit":
        editFile(props.id);
        break;
      case "rename":
        renameFile(props.id);
        break;
      case "remove":
        removeFolder(props.id);
        break;
      default:
        console.log('unknown option');
        break;
    }
  }

  function displayMenu(e, id){
    console.log('display menu:', e, 'for folder with id:', id)

    // put whatever custom logic you need
    // you can even decide to not display the Menu
    show(e, { props: { id } });
  }

  const openFile = (fileId) => {
    console.log('openFile not implemented yet')
  }

  const editFile = (fileId) => {
    console.log('editFile not implemented yet')
  }

  const renameFile = (fileId) => {
    console.log('renameFile not implemented yet')
  }

  const handleFolderClick = folderId => {
    console.log('clicked folder with id:', folderId)
    if(openFolders.includes(folderId)) {
      // remove id from folders
      setOpenFolders(prevFolders => prevFolders.filter(id => id !== folderId))
    }
    else {
      // add id to folders
      setOpenFolders(prevFolders => [...prevFolders, folderId])
    }
  }

  return (
    <React.Fragment>
      <Menu id={CONTEXT_MENU_ID}>
        <Item id="open" onClick={handleItemClick}>
          Open
        </Item>
        <Item id="edit" onClick={handleItemClick}>
          Edit
        </Item>
        <Item id="rename" onClick={handleItemClick}>
          Rename
        </Item>
        <Separator />
        <Item id="remove" onClick={handleItemClick}>
          Remove
        </Item>
      </Menu>

      <Card className="filemanager-sidebar me-md-2">
        <CardBody>
          <div className="d-flex flex-column h-100">
            <div className="mb-4">
              <div className="mb-3">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn btn-light w-100"
                    color="#eff2f7"
                  >
                    <i className="mdi mdi-plus me-1"></i> Create New
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem className="dropdown-item" onClick={addFolder}>
                      <i className="bx bx-folder me-1"></i> Folder
                    </DropdownItem>
                    <DropdownItem className="dropdown-item" onClick={addFile}>
                      <i className="bx bx-file me-1"></i> File
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              <ul className="list-unstyled categories-list">
                {/* <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={toggle}
                      to="#"
                    >
                      <i className="mdi mdi-folder font-size-16 text-warning me-2"></i>{" "}
                      Files{" "}
                      <i
                        className={
                          openFolders.includes(folder.id)
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>
                    <Collapse isOpen={openFolders.includes(folder.id)}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          {files.map(file => (
                            <StyledFile key={file.id} onContextMenu={e => displayMenu(e, file.id)}>
                              <Link to="#" className="d-flex align-items-center">
                                <span className="me-auto">{file.name}</span>
                                {file.isPinned && (
                                  <>
                                    {" "}
                                    <i className="mdi mdi-pin ms-auto"></i>
                                  </>
                                )}
                              </Link>
                            </StyledFile>
                          ))}
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li> */}

                {/* Quick Links? */}

                {folders.map(folder => (
                  <StyledFolder key={folder.id} onClick={() => handleFolderClick(folder.id)}>
                    <div className="text-body d-flex align-items-center">
                      <i className="mdi mdi-folder font-size-16 text-warning me-2"></i>{" "}
                      <span className="me-auto">{folder.name}</span>
                      <i
                        className={
                          openFolders.includes(folder.id)
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </div>
                    <Collapse isOpen={openFolders.includes(folder.id)}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          {folder.files.map(file => (
                            <StyledFile key={file.id} onContextMenu={e => displayMenu(e, file.id)}>
                              <Link to="#" className="d-flex align-items-center">
                                <span className="me-auto">{file.name}</span>
                                {file.isPinned && (
                                  <>
                                    {" "}
                                    <i className="mdi mdi-pin ms-auto"></i>
                                  </>
                                )}
                              </Link>
                            </StyledFile>
                          ))}
                          {/* {folder.files.length === 0 && (
                            <div>
                              <span>Create File</span>
                            </div>
                          )} */}
                        </ul>
                      </div>
                    </Collapse>
                  </StyledFolder>
                ))}
              </ul>
            </div>

            {/* Upgrade Prompt Box */}
            <div className="mt-auto">
              <UncontrolledAlert color="success" className="px-3 mb-0 alert-dismissible">
                <div className="mb-3">
                  <i className="bx bxs-folder-open h1 text-success"></i>
                </div>

                <div>
                  <h5 className="text-success">Upgrade Features</h5>
                  <p>Choose our premium plan to unlock more features!</p>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none text-success"
                    >
                      Upgrade <i className="mdi mdi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </UncontrolledAlert>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default FileRightBar

{/* <li>
  <Link to="#" className="text-body d-flex align-items-center">
    <i className="mdi mdi-dropbox font-size-16 me-2 text-primary"></i>{" "}
    <span className="me-auto">Dropbox</span>
  </Link>
</li>
<li>
  <Link to="#" className="text-body d-flex align-items-center">
    <i className="mdi mdi-share-variant font-size-16 me-2"></i>{" "}
    <span className="me-auto">Shared</span>{" "}
    <i className="mdi mdi-circle-medium text-danger ms-2"></i>
  </Link>
</li>
<li>
  <Link to="#" className="text-body d-flex align-items-center">
    <i className="mdi mdi-star-outline text-muted font-size-16 me-2"></i>{" "}
    <span className="me-auto">Starred</span>
  </Link>
</li>
<li>
  <Link to="#" className="text-body d-flex align-items-center">
    <i className="mdi mdi-trash-can text-danger font-size-16 me-2"></i>{" "}
    <span className="me-auto">Trash</span>
  </Link>
</li>
<li>
  <Link to="#" className="text-body d-flex align-items-center">
    <i className="mdi mdi-cog text-muted font-size-16 me-2"></i>{" "}
    <span className="me-auto">Settings</span>
    <span className="badge bg-success rounded-pill ms-2">
      01
    </span>
  </Link>
</li> */}