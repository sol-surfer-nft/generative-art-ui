/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilState, useRecoilValue } from 'recoil'
import { fileTreeState, fileTreeSelector, fileBrowserState, rootFoldersSelector } from '../../state/filesystem'
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
import classNames from "classnames"
import { ModalType } from "."
import { Folder } from "state/initialData"
// import ClickAwayListener from 'react-click-away-listener';

const FILE_MENU_ID = "file-menu-id";
const FOLDER_MENU_ID = "folder-menu-id";

const StyledFile = styled.li`
  &:hover {
    text-decoration: underline;
  }
`
const StyledFileItem = styled.li`
  cursor: pointer;
  padding: 2px 2px;

  &:hover {
    background-color: rgba(245, 245, 245, 1);
  }

  &.sidebar-item-active {
    background-color: rgba(235, 235, 235, 1);
  }
`
const StyledFolder = styled.li`
  cursor: pointer;

  .file-card-item {
    &:hover {
      background-color: rgba(245, 245, 245, 1);
    }

    
  }

  .sidebar-item-active {
    background-color: rgba(235, 235, 235, 1);
  }
`
const StyledUploadButton = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;

  .file-upload-input {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    padding-left: 100%;
    font-size: 20px;
    cursor: pointer !important;
    opacity: 0;
    filter: alpha(opacity=0);
  }
`

const MAX_FILES = 50

interface FileLeftBarProps {
  modal: any
  toggleModal: (type: ModalType, itemId?: null | string) => void
  addFileToFolder: (folderId: string) => void
  openFile: (id: string) => void
  openFolder: (name: string) => void
  editFile: (id: string) => void
  removeFile: (id: string) => void
  removeFolder: (id: string) => void
}

// file: id, name, file, Gb
const FileLeftBar = ({
  modal,
  toggleModal,
  addFileToFolder,
  openFile,
  openFolder,
  editFile,
  removeFile,
  removeFolder
}: FileLeftBarProps) => {
  const [openFolders, setOpenFolders] = useState<string[]>([])

  // const [folders, setFolders] = useRecoilState(foldersState)
  // const [rootFiles, setRootFiles] = useRecoilState(rootFilesState)
  // const [files, setFiles] = useRecoilState(filesState)
  const [fileTree, setFileTree] = useRecoilState(fileTreeState)
  // const [fileBrowser, setFileBrowser] = useRecoilState(fileBrowserState)
  // const currentFileTree = useRecoilValue(fileTreeSelector)

  const [folders, setFolders] = useRecoilState(rootFoldersSelector)

  const [selectedSidebarItem, setSelectedSidebarItem] = useState("")

  const { show } = useContextMenu();

  // @ts-ignore
  function handleFileItemClick({ event, props, triggerEvent, data }){
    console.log("props:", props)
    switch(event.currentTarget.id) {
      case "open":
        openFile(props.id);
        break;
      case "edit":
        editFile(props.id);
        break;
      case "rename":
        toggleModal("rename-file", props.id);
        break;
      case "remove":
        // @ts-ignore
        removeFile(props.id, props.root);
        break;
      default:
        console.log('unknown option');
        break;
    }
  }

  // @ts-ignore
  function handleFolderItemClick({ event, props, triggerEvent, data }){
    switch(event.currentTarget.id) {
      case "open":
        openFolder(props.name)
        handleFolderClick(props.id);
        break;
      case "add-file":
        // addFile(props.id);
        addFileToFolder(props.id); // selectedSidebarItem
        break;
      case "rename":
        toggleModal("rename-folder", props.id)
        break;
      case "remove":
        removeFolder(props.id);
        break;
      default:
        console.log('unknown option');
        break;
    }
  }

  // @ts-ignore
  function displayMenu(e, id, MENU_ID = FILE_MENU_ID, root=false, foldername?: string){
    // console.log('display menu:', e, 'for folder with id:', id)

    // put whatever custom logic you need
    // you can even decide to not display the Menu
    show(e, { id: MENU_ID, props: { id, root, name: foldername } });
  }

  const handleFolderClick = (folderId: string) => {
    if(selectedSidebarItem && selectedSidebarItem !== folderId) setSelectedSidebarItem(folderId)
    else setSelectedSidebarItem("")

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

  const handleFileClick = (fileId: string, root = false) => {
    if(selectedSidebarItem && selectedSidebarItem !== fileId) setSelectedSidebarItem(fileId)
    else setSelectedSidebarItem("")

    // Custom Logic for displaying files when clicked.
    // --> Maybe display toolbar or something?
    // if(root) {

    // }
    // else {

    // }
  }

  // const handleFileUpload = () => {
  //   console.log('not yet implemented')
  // }

  // @ts-ignore
  const onFileChange = (event) => {
    console.log('file upload event:', event)
    console.log('# files:', event.target.files.length)
    console.log('files:', event.target.files)


    if(event.target.files.length === 1) {
      // handle single file upload
      const file = event.target.files[0]
    }
    else if(event.target.files.length > 1) {
      // handle multiple file upload
      const file = event.target.files[0]
    }
  }

  const handleAddFolder = () => {
    toggleModal("add-folder")
  }

  const handleAddFile = () => {
    toggleModal("add-file") // selectedSidebarItem
  }

  // const onClickAwayFolder = (folderId) => {
  //   console.log('clicked away from folder:', folderId)
  // }

  // To Do: Display modal to add new file
  // Add settings item back in to left sidebar
  // Subrouter for files state in center piece?

  return (
    <React.Fragment>
      <Menu id={FILE_MENU_ID}>
        {/* @ts-ignore */}
        <Item id="open" onClick={handleFileItemClick}>
          Preview
        </Item>
        {/* @ts-ignore */}
        {/* <Item id="edit" onClick={handleFileItemClick}>
          Edit
        </Item> */}
        {/* @ts-ignore */}
        <Item id="rename" onClick={handleFileItemClick}>
          Rename
        </Item>
        <Separator />
        {/* @ts-ignore */}
        <Item id="remove" onClick={handleFileItemClick}>
          Remove
        </Item>
      </Menu>

      <Menu id={FOLDER_MENU_ID}>
        {/* @ts-ignore */}
        <Item id="open" onClick={handleFolderItemClick}>
          Open
        </Item>
        {/* @ts-ignore */}
        <Item id="add-file" onClick={handleFolderItemClick}>
          Add File
        </Item>
        {/* @ts-ignore */}
        <Item id="rename" onClick={handleFolderItemClick}>
          Rename
        </Item>
        <Separator />
        {/* @ts-ignore */}
        <Item id="remove" onClick={handleFolderItemClick}>
          Remove
        </Item>
      </Menu>

      <Card className="filemanager-sidebar me-md-2">
        <CardBody>
          <div className="d-flex flex-column h-100">
            <div className="mb-4">
              {/* Files List Header */}
              <div className="mb-3" style={{display:'flex',alignItems:'center'}}>
                {/* File Upload Icon Button */}
                {/* <Input
                  type="file" className="form-control" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" aria-label="Upload"
                /> */}
                {/* <StyledUploadButton
                  className="file-upload-button"
                >
                  <input type="file" onChange={onFileChange} className="file-upload-input" webkitdirectory="" mozdirectory="" directory="" />
                  <i className="mdi mdi-upload me-1"></i>{" "}
                </StyledUploadButton> */}

                {/* Create New Button */}
                <UncontrolledDropdown style={{flex:1, marginLeft: 6}}>
                  <DropdownToggle
                    className="btn btn-light w-100"
                    color="#eff2f7"
                  >
                    <i className="mdi mdi-plus me-1"></i> Create New
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem className="dropdown-item" onClick={() => handleAddFolder()}>
                      <i className="bx bx-folder me-1"></i> Folder
                    </DropdownItem>
                    <DropdownItem className="dropdown-item" onClick={() => handleAddFile()}>
                      <i className="bx bx-file me-1"></i> File
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className="dropdown-item">
                      <StyledUploadButton className="file-upload-button">
                        <input type="file" onChange={onFileChange} className="file-upload-input" multiple />
                        <i className="mdi mdi-upload me-1"></i>{" "}File Upload
                      </StyledUploadButton>
                    </DropdownItem>
                    <DropdownItem className="dropdown-item">
                      <StyledUploadButton className="file-upload-button">
                        {/* @ts-ignore */}
                        <input type="file" onChange={onFileChange} className="file-upload-input" directory="" webkitdirectory="" mozdirectory="" />
                        <i className="mdi mdi-upload me-1"></i>{" "}Folder Upload
                      </StyledUploadButton>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>


              {/* Sidebar Folders / Files List */}
              <ul className="list-unstyled categories-list">

                {folders.map((folder: Folder) => (
                  // <ClickAwayListener onClickAway={() => onClickAwayFolder(folder.id)} key={folder.id}>
                    <StyledFolder key={folder.id}>
                      <div className={classNames("text-body d-flex align-items-center file-card-item", { "sidebar-item-active": selectedSidebarItem && selectedSidebarItem === folder.id } )}
                        onContextMenu={(e) => displayMenu(e, folder.id, FOLDER_MENU_ID, false, folder.name)}
                        onClick={() => handleFolderClick(folder.id)}
                      >
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
                              <StyledFile key={file.id}
                                className={classNames({ "sidebar-item-active": selectedSidebarItem && selectedSidebarItem === file.id } )}
                                onContextMenu={e => displayMenu(e, file.id, FILE_MENU_ID)}
                                onClick={() => handleFileClick(file.id)}
                              >
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
                    </StyledFolder>
                  // </ClickAwayListener>
                ))}
                <div style={{height: 4}}></div>
                {fileTree.files.map(file => (
                  <StyledFileItem key={file.id}
                    className={classNames({ "sidebar-item-active": selectedSidebarItem && selectedSidebarItem === file.id } )}
                    onClick={() => handleFileClick(file.id, true)}
                  >
                    <div className="text-body d-flex align-items-center file-card-item" onContextMenu={(e) => displayMenu(e, file.id, FILE_MENU_ID, true)}>
                      <i className="bx bxs-spreadsheet font-size-16 text-info me-2"></i>{" "}
                      <span className="me-auto">{file.name}</span>
                      {/* Pinned icon here? */}
                    </div>
                  </StyledFileItem>
                ))}
              </ul>
            </div>

            {/* Upgrade Prompt Box */}
            {/* <div className="mt-auto">
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
            </div> */}
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default FileLeftBar

/* <li>
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
</li> */