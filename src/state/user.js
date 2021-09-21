import { atom } from 'recoil'

const defaultSettings = {
  mode: "light", // "dark"
}

export const notificationsState = atom({
  key: "notifications",
  default: []
})

export const settingsState = atom({
  key: "settings",
  default: defaultSettings
})

export const authState = atom({
  key: "auth",
  default: {} // default auth state
})