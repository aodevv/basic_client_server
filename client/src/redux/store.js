import { configureStore } from '@reduxjs/toolkit'
import {reducer as formReducer} from 'redux-form'
import reduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxThunk).concat(logger),
})