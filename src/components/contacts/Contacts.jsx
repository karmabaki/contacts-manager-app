import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Contact from './Contact';
import Spinner from '../Spinner';
import { deleteContact } from '../../redux/slices/contactSlice';
import ConfirmDialog from '../ConfirmDialog';
import SearchContact from '../SearchContact';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

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

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (contactId, fullname) => {
    setConfirm({ isOpen: true, contactId, fullname });
  };

  const handleCancel = () => {
    setConfirm({ isOpen: false, contactId: null, fullname: '' });
  };

  const handleConfirmDelete = async () => {
    const { contactId, fullname } = confirm;
    if (!contactId) return;

    setIsDeleting(true);                 
    setConfirm({ isOpen: false, contactId: null, fullname: '' });

    try {
      await dispatch(deleteContact(contactId)).unwrap();
      toast.success(`مخاطب "${fullname}" با موفقیت حذف شد`);
    } catch (err) {
      toast.error('خطا در حذف مخاطب');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading && !isDeleting) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>دفترچه تلفن - همه مخاطبین</title>
        <meta name="description" content="لیست تمام مخاطبین" />
      </Helmet>
      <div className="flex justify-center items-center my-6">
        <h2 className="text-2xl font-bold">مخاطبین</h2>
      </div>

      <SearchContact />

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