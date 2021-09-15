import { atom, selector } from 'recoil'
import { nanoid } from 'nanoid'

const initialState = {

}

export const globalState = atom({
  key: "globalState",
  default: initialState
})

export const modalState = atom({
  key: "global-modal",
  default: {
    open: false,
    name: "" // unique
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

export const rootFilesState = atom({
  key: "root-files",
  default: [
    {
      id: nanoid(),
      name: "root-file-1",
      gb: 0.5
    },
    {
      id: nanoid(),
      name: "root-file-2",
      gb: 2
    }
  ]
})

export const foldersState = atom({
  key: "folders",
  default: [
    {
      id: nanoid(),
      name: "folder 1",
      files: [
        {
          id: nanoid(),
          name: "file-1",
          gb: 1 // size
        },
        {
          id: nanoid(),
          name: "file-2",
          gb: 4
        }
      ]
    },
    {
      id: nanoid(),
      name: "Design",
      files: [
        {
          id: nanoid(),
          name: "file-1",
          gb: 7 // size
        },
        {
          id: nanoid(),
          name: "file-2",
          gb: 3
        }
      ]
    },
    {
      id: nanoid(),
      name: "Development",
      isPinned: true,
      files: [
        {
          id: nanoid(),
          name: "file-1",
          gb: 1 // size
        },
        {
          id: nanoid(),
          name: "file-2",
          gb: 2
        }
      ]
    },
    {
      id: nanoid(),
      name: "Admin",
      files: [
        {
          id: nanoid(),
          name: "file-1",
          gb: 3 // size
        },
        {
          id: nanoid(),
          name: "file-2",
          gb: 2
        },
        {
          id: nanoid(),
          name: "file-3",
          gb: 8
        }
      ]
    },
    {
      id: nanoid(),
      name: "Project A",
      files: [
        {
          id: nanoid(),
          name: "file-1",
          gb: 3 // size
        },
        {
          id: nanoid(),
          name: "file-2",
          gb: 2
        },
        {
          id: nanoid(),
          name: "file-3",
          gb: 1
        }
      ]
    },
    {
      id: nanoid(),
      name: "Applications",
      files: [
        {
          id: nanoid(),
          name: "file-1",
          gb: 2 // size
        },
        {
          id: nanoid(),
          name: "file-2",
          gb: 5
        },
        {
          id: nanoid(),
          name: "file-3",
          gb: 1
        }
      ]
    },
  ]
})