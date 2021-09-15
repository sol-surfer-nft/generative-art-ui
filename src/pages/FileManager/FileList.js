/* eslint-disable react/prop-types */
import React from "react"
import { Link } from "react-router-dom"
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { filesState } from '../../atoms'
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
import {
  Menu,
  Item,
  Separator,
  useContextMenu
} from "react-contexify";

const StyledFileCard = styled(Card)`
  cursor: pointer;

  &:hover {
    .file-card-title {
      text-decoration: underline;
    }
  }
`

const CONTEXT_MENU_ID = "menu-id";

// file: id, name, file, Gb

const FileList = () => {
  const [myfiles, setMyFiles] = useRecoilState(filesState)

  const { show } = useContextMenu({
    id: CONTEXT_MENU_ID
  });

  const onFileCardClick = (fileId) => {
    console.log('clicked file card with id:', fileId)

    // Open modal? Open containing files?
  }

  const removeFolder = folderId => {
    setMyFiles(oldfiles => oldfiles.filter(file => file.id !== folderId))
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

      {/* Files List Header */}
      <div>
        <Row className="mb-3">
          <Col xl={3} sm={6}>
            <div className="mt-2">
              <h5>My Files</h5>
            </div>
          </Col>
          <Col xl={9} sm={6}>
            <Form className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
              {/* Files List Header */}
              <div className="search-box mb-2 me-2">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control bg-light border-light rounded"
                    placeholder="Search..."
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
                    Other Actions
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
          {myfiles.map((myfile, key) => (
            <Col xl={4} sm={6} key={key}>
              <StyledFileCard
                className="shadow-none border"
                onClick={onFileCardClick}
                onContextMenu={(e) => displayMenu(e, myfile.id)}
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
                          <Link className="dropdown-item" to="#">
                            Open
                          </Link>
                          <Link className="dropdown-item" to="#">
                            Edit
                          </Link>
                          <Link className="dropdown-item" to="#">
                            Rename
                          </Link>
                          <div className="dropdown-divider"></div>
                          <button className="dropdown-item" onClick={() => removeFolder(myfile.id)}>
                            Remove
                          </button>
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
                            {myfile.name}
                          </Link>
                        </h5>
                        <p className="text-muted text-truncate mb-0">
                          {myfile.file} Files
                        </p>
                      </div>
                      <div className="align-self-end ms-2">
                        <p className="text-muted mb-0">{myfile.Gb}GB</p>
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
