import React, { useState, useEffect } from "react"
import { Card, CardBody } from "reactstrap"
import { useRecoilState } from 'recoil'
import { foldersState, rootFilesState } from '../../atoms'
import { nanoid } from 'nanoid'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

// import Components
import FileLeftBar from "./FileLeftBar"
import FileList from "./FileList"
import RecentFiles from "./RecentFiles"
import Storage from "./Storage"

import { AddFileModal, AddFolderModal, RenameFileModal, RenameFolderModal } from './modals'

const series = [76]

const FileManager = () => {
  const [folders, setFolders] = useRecoilState(foldersState)
  const [rootFiles, setRootFiles] = useRecoilState(rootFilesState)

  const [modal, setModal] = useState(false)
  const [modalType, setModalType] = useState("add-file") // "add-file", "add-folder", "rename-file", "rename-folder"

  const toggleModal = (fileType = "add-file") => {
    console.log('toggling modal')
    setModal(prev => !prev)
    if(modalType !== fileType) setModalType(fileType)
  }

  const closeModal = () => {
    setModal(false)
    setModalType("add-file")
  }

  const onFileModalSubmit = async (filename) => {
    return new Promise((resolve, reject) => {
      // Mock response. Can try/catch here too
      setTimeout(() => {
        // Add file with filename to project, then resolve successful to close the modal
        if(!filename) return reject("Error: File name not found")

        setRootFiles(prevRootFiles => ([...prevRootFiles, {
          id: nanoid(),
          name: filename,
          gb: Math.floor(Math.random() * 5) + 1
        }]))

        resolve("success!")
      }, 1000)
    })
  }

  const onFolderModalSubmit = async (foldername) => {
    return new Promise((resolve, reject) => {
      // Mock response. Can try/catch here too
      setTimeout(() => {
        // Add file with filename to project, then resolve successful to close the modal
        if(!foldername) return reject("Error: Folder name not found")

        setFolders(prevFolders => ([...prevFolders, {
          id: nanoid(),
          name: foldername,
          files: [],
        }]))

        resolve("success!")
      }, 1000)
    })
  }
  
  return (
    <React.Fragment>
      <Breadcrumbs title="Apps" breadcrumbItem="NFT Tool" breadcrumbTitle="NFT Tool (demo)" />
      <div className="d-xl-flex">
        <div className="w-100">
          <div className="d-md-flex">
            <FileLeftBar modal={modal} toggleModal={toggleModal} />
            <div className="w-100">
              <Card>
                <CardBody>
                  <FileList modal={modal} toggleModal={toggleModal} />
                  <RecentFiles />

                  <AddFileModal
                    isOpen={modal && modalType === "add-file"}
                    toggleModal={toggleModal}
                    closeModal={closeModal}
                    onSubmit={onFileModalSubmit}
                  />
                  <AddFolderModal
                    isOpen={modal && modalType === "add-folder"}
                    toggleModal={toggleModal}
                    closeModal={closeModal}
                    onSubmit={onFolderModalSubmit}
                  />
                  <RenameFileModal
                    isOpen={modal && modalType === "rename-file"}
                    toggleModal={toggleModal}
                    closeModal={closeModal}
                    onSubmit={onFileModalSubmit}
                  />
                  <RenameFolderModal
                    isOpen={modal && modalType === "rename-folder"}
                    toggleModal={toggleModal}
                    closeModal={closeModal}
                    onSubmit={onFolderModalSubmit}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        <Storage
          options={storageChartOptions}
          series={series}
        />
      </div>
    </React.Fragment>
  )
}

const storageChartOptions = {
  labels: ["Storage"],
  chart: {
    height: 150,
    type: "radialBar",
    sparkline: {
      enabled: true,
    },
  },
  colors: ["#556ee6"],
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: "97%",
        margin: 5, // margin is in pixels
      },

      hollow: {
        size: "60%",
      },

      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: -2,
          fontSize: "16px",
        },
      },
    },
  },
  grid: {
    padding: {
      top: -10,
    },
  },
  stroke: {
    dashArray: 3,
  },
}

export default FileManager
