import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { setLoading, clearError, setError } from '../../redux/slices/uiSlice';
import { getContact } from "../../contactService"
import Spinner from '../Spinner';
import { Helmet } from 'react-helmet-async';


const ViewContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(clearError());

    getContact(contactId)
      .then(({ data }) => setContact(data))
      .catch((err) => {
        dispatch(
          setError(err.response?.data?.message || 'خطا در دریافت اطلاعات مخاطب')
        );
        navigate('/');
      })
      .finally(() => dispatch(setLoading(false)));
  }, [contactId, dispatch, navigate]);

  if (loading) return <Spinner />;

  if (!contact)
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">مخاطب یافت نشد.</p>
        <Link to="/" className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          بازگشت
        </Link>
      </div>
    );

  return (
    <>
    <Helmet>
      <title>{contact ? `${contact.fullname} - مشاهده` : 'بارگذاری...'}</title>
    </Helmet>
    <div className="mt-8 max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">{contact.fullname}</h2>
        <div className="flex gap-2">
          <Link
            to={`/contacts/edit/${contact.id}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
          >
            ویرایش
          </Link>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
          >
            بازگشت
          </button>
        </div>
      </div>
      <div className="p-6 text-center">
        <img
          src={contact.photo || 'https://via.placeholder.com/150'}
          alt={contact.fullname}
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow"
        />
        <div className="space-y-1 text-gray-700">
          <p><strong>موبایل:</strong> {contact.mobile}</p>
          <p><strong>ایمیل:</strong> {contact.email}</p>
          <p><strong>شغل:</strong> {contact.job}</p>
          <p><strong>گروه:</strong> {contact.group}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewContact;