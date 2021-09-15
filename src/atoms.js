import { atom } from 'recoil'
import filesData from './common/data/files'

const initialState = {

}

export const globalState = atom({
  key: "globalState",
  default: initialState
})

export const filesState = atom({
  key: "files",
  default: filesData
})