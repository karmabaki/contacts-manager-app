import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createContact,
  setCurrentContact,
  clearCurrentContact,
} from '../../redux/slices/contactSlice';
import Spinner from '../Spinner';

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentContact } = useSelector((state) => state.contacts);
  const { groups, loading } = useSelector((state) => state.ui);

  const handleChange = (e) => {
    dispatch(
      setCurrentContact({ ...currentContact, [e.target.name]: e.target.value })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentContact.fullname || !currentContact.mobile) {
      alert('نام و موبایل الزامی است');
      return;
    }
    dispatch(createContact(currentContact));
    dispatch(clearCurrentContact());
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h3 className="text-2xl font-bold mb-6 text-center">افزودن مخاطب جدید</h3>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullname"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="نام کامل*"
            value={currentContact.fullname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="photo"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="آدرس تصویر"
            value={currentContact.photo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobile"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="موبایل*"
            value={currentContact.mobile}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ایمیل"
            value={currentContact.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="job"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="شغل"
            value={currentContact.job}
            onChange={handleChange}
          />
          <select
            name="group"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currentContact.group}
            onChange={handleChange}
          >
            <option value="">انتخاب گروه</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg shadow transition-colors"
            >
              ایجاد مخاطب
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg transition-colors"
            >
              انصراف
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddContact;