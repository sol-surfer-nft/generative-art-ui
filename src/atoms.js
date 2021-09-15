import { atom } from 'recoil'

const initialState = {

}

export const globalState = atom({
  key: "globalState",
  default: initialState
})