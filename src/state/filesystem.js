import { nanoid } from 'nanoid';
import { atom, selector } from 'recoil'
import { initialFileTree, Folder, File } from './initialData';

export const fileBrowserState = atom({
  key: "fileBrowserState",
  default: {
    path: "",
    folder: true
  }
})

export const fileTreeState = atom({
  key: "filetree",
  default: initialFileTree
})

const getFolderRecursive = (folder, searchname) => {
  if(!folder || folder.folders.length === 0)
    return;

  let found = folder.folders.find(folder => {
    if(folder.name === searchname)
      return folder;
    let foundFolder = getFolderRecursive(folder, searchname)
    if(foundFolder) return foundFolder;
    return;
  })
  if(found) return found;
  else return;
}

export const rootFoldersSelector = selector({
  key: "root-folders-selector",
  get: ({get}) => {
    let fileTree = get(fileTreeState)
    return fileTree.folders.map(folder => {
      return {
        id: folder.id,
        name: folder.name,
        files: folder.files,
      }
    });
  },
  set: ({get, set}, newRootFolders) => {
    let fileTree = get(fileTreeState)

    set(fileTreeState, (prevFileTree) => {
      return {
        ...prevFileTree,
        folders: prevFileTree.folders.map((fileTreeFolder, index) => ({
          ...fileTreeFolder, // to capture the files, id, name, other things
          ...newRootFolders[index], // to overwrite the old with the new, without removing other properties like `folder.files`
        }))
      }
    })
  },
  dangerouslyAllowMutability: true
})
// export const allFilesSelector = selector({
//   key: "all-files-selector",
//   get: ({get}) => {
//     let fileTree = get(fileTreeState)

//     return [
//       ...fileTree.files,
//       ...fileTree.folders.map(folder => folder.files)
//     ]
//   }
// })
// const getFoldersRecursive = folder => {
//   return folder.folders.map(folder => {
//     if(folder.folders)
//       return getFoldersRecursive(folder)
//     return {
//       ...folder,
//       folders: []
//     };
//   })
// }

// export const foldersSelector = selector({
//   key: "folders-selector",
//   get: ({get}) => {
//     let fileTree = get(fileTreeState)

//     let folders = fileTree.folders.map(folder => {
//       return getFoldersRecursive(folder)
//     })
//   }
// })
export const fileTreeSelector = selector({
  key: "filetree-selector",
  get: ({get}) => {
    let { path, folder } = get(fileBrowserState);
    let fileTree = get(fileTreeState)

    if(!path.includes('/')) {
      // get from root
      return fileTree;
    }

    let filePathArray = path.split('/')
    let currentName = filePathArray[filePathArray.length - 1]
    console.log('filepath array:', filePathArray)
    
    let found;

    // Find folder or file by its id
    if(folder) {
      found = getFolderRecursive(fileTree, currentName)
      if(found) {
        console.log('found:', found)
        return found;
      }
      else console.log('found undefined!')
    }

    return {
      id: nanoid()
      // id: found.id,
      // name: found.name,
      // files: [],
      // folders: []
    }
  }
})

export const filesState = selector({
  key: "files",
  get: ({get}) => {
    const folders = get(foldersState)
    const rootFiles = get(rootFilesState)

    const foldersReducer = (previousValue, currentValue) => {
      // if previous is []
      if(!currentValue.files) return previousValue;
      return [...previousValue, ...currentValue.files.map(file => ({...file, folderId: currentValue.id, folderName: currentValue.name }))] 
    }

    const derivedFiles = folders.reduce(foldersReducer, rootFiles);

    console.log('derived files:', derivedFiles)

    return derivedFiles
  }
})
