import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as contactService from "../../contactService"
import { setLoading, setError, clearError } from './uiSlice';


export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const { data } = await contactService.getAllContacts();
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'خطا در دریافت مخاطبین';
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const createContact = createAsyncThunk(
  'contacts/create',
  async (contact, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const { data } = await contactService.createContact(contact);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'خطا در ایجاد مخاطب';
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/update',
  async ({ contactId, contact }, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const { data } = await contactService.updateContact(contactId, contact);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'خطا در ویرایش مخاطب';
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (contactId, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      await contactService.removeContact(contactId);
      return contactId;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'خطا در حذف مخاطب';
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);


const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],  
    filteredItems: [],          
    currentContact: {          
      fullname: '',
      photo: '',
      mobile: '',
      email: '',
      job: '',
      group: '',
    },
    query: { text: '' },     
  },
  reducers: {
    setCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearCurrentContact: (state) => {
      state.currentContact = {
        fullname: '',
        photo: '',
        mobile: '',
        email: '',
        job: '',
        group: '',
      };
    },
    filterContacts: (state) => {
      if (state.query.text === '') {
        state.filteredItems = state.items;
      } else {
        const term = state.query.text.toLowerCase();
        state.filteredItems = state.items.filter(
          (c) =>
            c.fullname.toLowerCase().includes(term)
        );
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      // Create
      .addCase(createContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.filteredItems.push(action.payload);
      })
      // Update
      .addCase(updateContact.fulfilled, (state, action) => {
        const updated = action.payload;
        state.items = state.items.map((c) => (c.id === updated.id ? updated : c));
        state.filteredItems = state.filteredItems.map((c) =>
          c.id === updated.id ? updated : c
        );
      })
      // Delete
      .addCase(deleteContact.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.items = state.items.filter((c) => c.id !== deletedId);
        state.filteredItems = state.filteredItems.filter((c) => c.id !== deletedId);
      });
  },
});

export const {
  setCurrentContact,
  setQuery,
  clearCurrentContact,
  filterContacts,
} = contactSlice.actions;
export default contactSlice.reducer;