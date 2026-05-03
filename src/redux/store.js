import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    ui: uiReducer,
  },
});