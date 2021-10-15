import { nanoid } from 'nanoid'

export type SupportedFileTypes = "png" | "jpeg" | "jpg";
export interface Folder {
  id: string
  name: string
  folders: Folder[]
  files: File[]
}
export interface File {
  id: string
  name: string
  data: FileData
  isPinned?: boolean
}
export interface FileData {
  url?: string,
  filetype?: SupportedFileTypes,
  size?: number,
}

export const initialRootFiles: File[] = [
  {
    id: nanoid(),
    name: "root-file-1",
    data: {
      size: 0.5
    }
  },
  {
    id: nanoid(),
    name: "root-file-2",
    data: {
      size: 2
    }
  }
]
export const initialFileTree: Folder = {
  id: nanoid(), // root id
  name: "", // root name
  // root placement
  folders: [
    {
      id: nanoid(),
      name: 'first folder',
      folders: [],
      // folders: [
      //   {
      //     id: nanoid(),
      //     name: 'A-folder',
      //     folders: [
      //       {
      //         id: nanoid(),
      //         name: "nested folder-Aa",
      //         folders: [],
      //         files: []
      //       }
      //     ],
      //     files: [
      //       {
      //         id: nanoid(),
      //         name: 'nested file-A',
      //         data: {
      //           filetype: "png",
      //           size: 128,
      //           url: "https://google.com",
      //         }
      //       },
      //       {
      //         id: nanoid(),
      //         name: 'nested file-B',
      //         data: {
      //           filetype: "jpeg",
      //           size: 512,
      //           url: "https://github.com"
      //         }
      //       }
      //     ]
      //   }
      // ],
      files: [
        {
          id: nanoid(),
          name: 'first file',
          data: {}
        }
      ],
    },
    {
      id: nanoid(),
      name: 'second folder',
      folders: [],
      files: []
    }
  ],
  files: initialRootFiles
}

interface OldFolder {
  id: string
  name: string
  files: OldFile[]
  isPinned?: boolean
}
interface OldFile {
  id: string
  name: string
  gb: number
  url?: string
}
// Old Method: No support for nested folders
export const initialFolders: OldFolder[] = [
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

interface FlatFolder {
  id: string
  parentPath?: string 
  name: string
  folders: string[]
  files: File[]
}
interface FlatFileSystem {
  [path: string]: FlatFolder
}

const rootFolder: FlatFolder = {
  id: nanoid(),
  name: "",
  folders: ["first folder", "second folder",],
  files: [
    {
      id: nanoid(),
      name: 'file-1',
      data: {
        filetype: "png",
        url: "https://google.com",
        size: 128
      },
    },
    {
      id: nanoid(),
      name: 'file-2',
      data: {
        filetype: 'jpeg',
        url: "https://github.com",
        size: 512
      }
    }
  ]
}

const firstFolder: FlatFolder = {
  id: nanoid(),
  name: "first folder",
  parentPath: "/",
  folders: ["A-folder"],
  files: [
    {
      id: nanoid(),
      name: 'first file',
      data: {}
    }
  ],
}
const secondFolder: FlatFolder = {
  id: nanoid(),
  name: "second folder",
  parentPath: "/",
  folders: [], //["B-folder"],
  files: [
    {
      id: nanoid(),
      name: 'first file',
      data: {}
    }
  ],
}
const AFolder: FlatFolder = {
  id: nanoid(),
  name: "A-folder",
  parentPath: "/first-folder",
  folders: [],
  files: [
    {
      id: nanoid(),
      name: 'nested file-A',
      data: {
        filetype: "png",
        size: 128,
        url: "https://google.com",
      }
    },
    {
      id: nanoid(),
      name: 'nested file-B',
      data: {
        filetype: "jpeg",
        size: 512,
        url: "https://github.com"
      }
    }
  ]
}

export const alternateFileSystem: FlatFileSystem = {
  "/": rootFolder,
  "/first folder": firstFolder,
  "/second folder": secondFolder,
  "/first folder/A-folder": AFolder,
}