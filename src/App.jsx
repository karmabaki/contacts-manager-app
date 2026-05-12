import React, { lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/slices/contactSlice';
import { getAllGroups } from "./contactService"
import { setGroups, clearError } from './redux/slices/uiSlice';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar"
import Contacts from "./components/contacts/Contacts"

const EditContact = lazy(()=>import("./components/contacts/EditContact"));
const AddContact = lazy(()=>import("./components/contacts/AddContact"));
const ViewContact = lazy(()=>import("./components/contacts/ViewContact"));

const App = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.ui);

  
  useEffect(() => {
    dispatch(fetchContacts());

    const fetchGroups = async () => {
      try {
        const { data } = await getAllGroups();
        dispatch(setGroups(data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchGroups();
  }, [dispatch]);


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError()); 
    }
  }, [error, dispatch]);

  return (
  <>
    <ToastContainer position="top-right" rtl={true} autoClose={3000} theme='colored'/>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32">
      <Navbar />
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
      </Routes>
    </div>
  </>
  );
};

export default App;