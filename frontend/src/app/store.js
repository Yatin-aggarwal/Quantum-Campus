import { configureStore } from '@reduxjs/toolkit'
import Credentials_reducer from "../features/Credentials_slice.js"
export const store = configureStore({
  reducer: {
    Credential_reduce:Credentials_reducer
  },
})