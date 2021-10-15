import { atom, selector } from 'recoil'
// import { nanoid } from 'nanoid'

const initialGlobalState = {}

export const globalState = atom({
  key: "globalState",
  default: initialGlobalState
})

export const modalState = atom({
  key: "global-modal",
  default: {
    open: false,
    name: "" // unique
  }
})

export const isAuthState = atom({
  key: "auth-state",
  default: false
})