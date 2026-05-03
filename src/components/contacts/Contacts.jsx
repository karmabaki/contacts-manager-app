import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Contact from './Contact';
import Spinner from '../Spinner';
import { deleteContact } from '../../redux/slices/contactSlice';
import ConfirmDialog from '../ConfirmDialog';
import SearchContact from '../SearchContact';

const Contacts = () => {
  const contactsState = useSelector((state) => state.contacts);
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  
  const filteredItems = Array.isArray(contactsState?.filteredItems)
    ? contactsState.filteredItems
    : [];

  const [confirm, setConfirm] = useState({
    isOpen: false,
    contactId: null,
    fullname: '',
  });

  const handleDeleteClick = (contactId, fullname) => {
    setConfirm({ isOpen: true, contactId, fullname });
  };

  const handleConfirmDelete = () => {
    dispatch(deleteContact(confirm.contactId));
    setConfirm({ isOpen: false, contactId: null, fullname: '' });
  };

  const handleCancel = () => setConfirm({ ...confirm, isOpen: false });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center my-6">
        <h2 className="text-2xl font-bold mb-3 md:mb-0">مخاطبین</h2>
        
      </div>

      <SearchContact />

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((contact) => (
              <Contact
                key={contact.id}
                contact={contact}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400">
              هیچ مخاطبی یافت نشد.
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={confirm.isOpen}
        title={`آیا از حذف "${confirm.fullname}" مطمئن هستید؟`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />
    </>
  );
};

export default Contacts;