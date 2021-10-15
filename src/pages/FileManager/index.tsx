import React, { useState, useEffect } from "react"
import { Card, CardBody } from "reactstrap"
import { useRecoilState, useRecoilValue } from 'recoil'
import { fileBrowserState, fileTreeState, fileTreeSelector, rootFoldersSelector, activeIdSelector } from '../../state/filesystem'
import { nanoid } from 'nanoid'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

// import Components
import FileLeftBar from "./FileLeftBar"
import FileList from "./FileList"
// import RecentFiles from "./RecentFiles"
// import Storage from "./Storage"

import { AddFileModal, AddFolderModal, RenameFileModal, RenameFolderModal } from './modals'
import { File, Folder } from "state/initialData"

const series = [0]
const defaultModalType = "add-file"

export type ModalType = "add-file" | "rename-file" | "add-folder" | "rename-folder"

const MAX_FOLDER_DEPTH = 2; // 1 folder deep

const FileManager = () => {
  // const [folders, setFolders] = useRecoilState(foldersState)
  // const [rootFiles, setRootFiles] = useRecoilState(rootFilesState)
  const [fileTree, setFileTree] = useRecoilState(fileTreeState)
  const [fileBrowser, setFileBrowser] = useRecoilState(fileBrowserState)
  const currentFileTree = useRecoilValue(fileTreeSelector)
  const [folders, setFolders] = useRecoilState(rootFoldersSelector)

  const [modal, setModal] = useState(false)
  const [modalType, setModalType] = useState(defaultModalType) // "add-file", "add-folder", "rename-file", "rename-folder"
  const [activeId, setActiveId] = useRecoilState(activeIdSelector)
  const [parentFolder, setParentFolder] = useState<string | undefined>(undefined) // for adding files to folders

  useEffect(() => {
    return () => reset()
  }, [])

  const toggleModal = (type: ModalType, itemId?: string | null) => {
    if(!type) return;
    if(itemId) setActiveId(itemId)
    
    console.log('toggling modal')

    setModal(prev => !prev)

    if(type !== modalType)
      setModalType(type)
  }

  const closeModal = () => {
    setModal(false)
    setModalType(defaultModalType)
  }

  const onFileModalSubmit = async (filename: string, type: ModalType, parentFolderId?: string) => {
    return new Promise((resolve, reject) => {
      // Mock response. Can try/catch here too
      setTimeout(() => {
        // Add file with filename to project, then resolve successful to close the modal
        if(!filename) return reject("Error: File name not found")
        if(!activeId && type === "rename-file") return reject("Error: The file you identified was not found")
        console.log('type:', type)
        if(type === "add-file") {
          if(parentFolder)
            parentFolderId = parentFolder
          else if(!parentFolderId) parentFolderId = undefined;
          addFile(filename, parentFolderId)
          // setRootFiles(prevRootFiles => ([...prevRootFiles, {
          //   id: nanoid(),
          //   name: filename,
          //   gb: Math.floor(Math.random() * 5) + 1
          // }]))
        }
        else if(type === "rename-file") {
          // check if file name already exists
          if(fileTree.files.find(file => file.name === filename))
            reject("Error: File name already exists");
          else if (fileTree.folders.find(folder => folder.files.find(file => file.name === filename))) {
            reject("Error: File name already exists")
          }
          renameFile(activeId, filename, parentFolderId)
          // setRootFiles(prevRootFiles => prevRootFiles.map(prevRootFile => {
          //   if(prevRootFile.id === activeId) {
          //     return {
          //       ...prevRootFile,
          //       name: filename
          //     }
          //   }
          //   return prevRootFile
          // }))
        }
        else return reject("Error: Unknown exception occured")

        resolve("success!")
      }, 1000)
    })
  }

  const onFolderModalSubmit = async (foldername: string, type: ModalType) => {
    return new Promise((resolve, reject) => {
      // Mock response. Can try/catch here too
      setTimeout(() => {
        // Add file with filename to project, then resolve successful to close the modal
        if(!foldername) return reject("Error: Folder name not found")
        if(!activeId && type === "rename-folder") return reject("Error: The folder you identified was not found")

        if(type === "add-folder") {
          addFolder(foldername)
        }
        else if(type === "rename-folder") {
          renameFolder(activeId, foldername)
        }
        else return reject("Error: Unknown exception occured")

        resolve("success!")
      }, 1000)
    })
  }

  const addFolder = (name: string, parentFolderId?: string) => {
    // toggleModal("add-folder")
    // add to root of fileTree
    if(!parentFolderId || parentFolderId === fileTree.id)
      setFileTree(prevTree => ({
        ...prevTree,
        folders: [
          ...prevTree.folders,
          {
            id: nanoid(),
            name: name || ("Untitled-" + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9)),
            files: [],
            folders: []
          }
        ]
      }))
    else {
      // Add folder to relevant place
      
      // see if is in root
      let foundFolder = fileTree.folders.find(folder => folder.id === parentFolderId)
      if(!foundFolder) {
        // is not in root. fuck it
        // let nextFolder = getNextFolder(fileTree.folders[0], 0, parentFolderId)
        // console.log('next folder:', nextFolder)
        console.log('not doing folders at this depth')
      }
      // either way, just add to root for now
      setFileTree(prevTree => ({
        ...prevTree,
        folders: [
          ...prevTree.folders,
          {
            id: nanoid(),
            name: name || ("Untitled-" + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9)),
            files: [],
            folders: []
          }
        ]
      }))
    }
  }

  const getNextFolder = (folder: Folder, nextIndex: number, parentFolderId?: string) => {
    let found2 = folder.folders.find(folder => folder.id === parentFolderId)
    if(found2) {
      console.log('found!', found2)
      return found2
    }
    else if (nextIndex + 1 < folder.folders.length) {
      console.log('returning next folder')
      getNextFolder(folder.folders[nextIndex], nextIndex + 1)
    }
    else {
      console.log('nothing found. returning blank')
      return;
    }
  }

  const addFile = (filename: string, folderId?: string) => {
    console.log('folder id:', folderId)
    // TODO: swap to modal, then proceed with logic and the final name
    // Note: Might be time to refactor this logic code to its own service

    const newFile: File = {
      id: nanoid(),
      name: filename || "Untitled-" + nanoid(4),
      data: {
        size: Math.floor(Math.random() * 5) + 1
      }
    }

    if(!folderId) {
      // Check if a directory or file is currently active, and get its level
        // check if its a root file
        // let rootFound = fileTree.files.find(rootFile => rootFile.id === selectedSidebarItem)
        // if(rootFound) {
        //   // Add to root level of tree
        //   setFileTree(prevTree => ({
        //     ...prevTree,
        //     files: [...prevTree.files, newFile]
        //   }))
        // }
        // else {
        //   // search folders (TODO: optimize by storing helper data in state, along with the active item id. Keep state flattened though)
        //   let folderFound = folders.find(folder => folder.id === selectedSidebarItem)
        //   if(folderFound) {
        //     // is folder, add file under folder
        //     setFolders(prevFolders => prevFolders.map(prevFolder => {
        //       if(prevFolder.id === selectedSidebarItem) {
        //         return {
        //           ...prevFolder,
        //           files: [...prevFolder.files, newFile]
        //         }
        //       }
        //       return prevFolder;
        //     }))
        //   }
        //   else {
        //     // search rest of files
        //     let fileFound = files.find(file => file.id === selectedSidebarItem)
        //     if(fileFound) {
        //       // add to the file's parent folder (found in `file.folderId`)
        //       setFolders(prevFolders => prevFolders.map(prevFolder => {
        //         if(prevFolder.id === fileFound.folderId) {
        //           return {
        //             ...prevFolder,
        //             files: [...prevFolder.files, newFile]
        //           }
        //         }
        //         return prevFolder;
        //       }))
        //     }
        //     else {
        //       // Add file to root level anyways
        //       setFileTree(prevTree => ({
        //         ...prevTree,
        //         files: [...prevTree.files, newFile]
        //       }))
        //     }
        //   }
        // }
      // else {
      //   // Add file to root level anyways
        setFileTree(prevTree => ({
          ...prevTree,
          files: [...prevTree.files, newFile]
        }))
      // }
    }
    else {
      // Try to add file under folder id
      setFolders((prevFolders: Folder[]) => prevFolders.map(folder => {
        if(folder.id === folderId) {
          return {
            ...folder,
            files: [
              ...folder.files,
              {
                id: nanoid(),
                name: filename,
                gb: Math.floor(Math.random() * 5) + 1
              }
            ]
          }
        }
        return folder;
      }))
    }
  }

  const removeFolder = (folderId: string) => {
    setFileTree(prevTree => ({
      ...prevTree,
      folders: prevTree.folders.filter(folder => folder.id !== folderId)
    }))
  }

  const renameFolder = (folderId: string, newName: string) => {
    setFileTree(prevTree => ({
      ...prevTree,
      folders: prevTree.folders.map(folder => {
        if(folder.id === folderId) {
          return {
            ...folder,
            name: newName
          }
        }
        return folder;
      })
    }))
  }

  const renameFile = (fileId: string, newName: string, parentFolderId?: string) => {
    if(!parentFolderId) {
      setFileTree(prevTree => ({
        ...prevTree,
        files: prevTree.files.map(file => {
          if(file.id === fileId) {
            return {
              ...file,
              name: newName
            }
          }
          return file;
        })
      }))
    }
    else {
      setFolders((prevFolders: Folder[]) => prevFolders.map(folder => {
        if(folder.id === parentFolderId) {
          return {
            ...folder,
            files: folder.files.map(file => {
              if(file.id === fileId) {
                return {
                  ...file,
                  name: newName
                }
              }
              return file;
            })
          }
        }
        return folder;
      }))
    }
  }

  const removeFile = (fileId: string, root = false) => {
    setFileTree(prevTree => ({
      ...prevTree,
      files: prevTree.files.filter(file => file.id !== fileId),
      folders: prevTree.folders.map(folder => {
        // if file is in folder, remove it
        if(folder.files.find(file => file.id === fileId)) {
          return {
            ...folder,
            files: folder.files.filter(file => file.id !== fileId)
          }
        }
        return folder;
      })
    }))
  }

  const openFile = (fileId: string) => {
    console.log('openFile not implemented yet')
  }

  const editFile = (fileId: string) => {
    console.log('editFile not implemented yet')
  }

  const openFolder = (foldername: string) => {
    if(!foldername) return;
    // set the current path to the path with this folder id
    setFileBrowser(prevBrowser => ({
      ...prevBrowser,
      path: "/" + foldername
    }))
  }

  const addFileToFolder = (folderId: string) => {
    if(!folderId) return;
    console.log('folder id:', folderId)
    setParentFolder(folderId)

    // show modal and wait
    setModalType("add-file")
    setModal(true);
  }

  const reset = () => {
    setActiveId(null)
    setModal(false)
    setModalType(defaultModalType)
  }
  
  return (
    <React.Fragment>
      <Breadcrumbs title="SolSurfer" breadcrumbItem="Assets" breadcrumbTitle="Asset Manager" />
      <div className="d-xl-flex">
        <div className="w-100">
          <div className="d-md-flex">
            <FileLeftBar
              modal={modal}
              toggleModal={toggleModal}
              addFileToFolder={addFileToFolder}
              openFile={openFile}
              openFolder={openFolder}
              editFile={editFile}
              removeFile={removeFile}
              removeFolder={removeFolder}
            />
            <div className="w-100">
              <Card>
                <CardBody>
                <FileList
                  modal={modal}
                  toggleModal={toggleModal}
                  addFileToFolder={addFileToFolder}
                  openFile={openFile}
                  openFolder={openFolder}
                  editFile={editFile}
                  removeFile={removeFile}
                  removeFolder={removeFolder}
                />
                  
                  {/* <RecentFiles /> */}

                  {/* Optimize: Combine modal and modalType into single string value */}
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
        {/* <Storage
          options={storageChartOptions}
          series={series}
        /> */}
      </div>
    </React.Fragment>
  )
}

// const storageChartOptions = {
//   labels: ["Storage"],
//   chart: {
//     height: 150,
//     type: "radialBar",
//     sparkline: {
//       enabled: true,
//     },
//   },
//   colors: ["#556ee6"],
//   plotOptions: {
//     radialBar: {
//       startAngle: -90,
//       endAngle: 90,
//       track: {
//         background: "#e7e7e7",
//         strokeWidth: "97%",
//         margin: 5, // margin is in pixels
//       },

//       hollow: {
//         size: "60%",
//       },

//       dataLabels: {
//         name: {
//           show: false,
//         },
//         value: {
//           offsetY: -2,
//           fontSize: "16px",
//         },
//       },
//     },
//   },
//   grid: {
//     padding: {
//       top: -10,
//     },
//   },
//   stroke: {
//     dashArray: 3,
//   },
// }

export default FileManager
