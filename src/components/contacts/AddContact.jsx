import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createContact, setCurrentContact, clearCurrentContact } from '../../redux/slices/contactSlice';
import { contactSchema } from '../../validations/contactValidation';
import Spinner from '../Spinner';

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentContact } = useSelector((state) => state.contacts);
  const { groups, loading } = useSelector((state) => state.ui);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    dispatch(
      setCurrentContact({ ...currentContact, [e.target.name]: e.target.value })
    );
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await contactSchema.validate(currentContact, { abortEarly: false });
      dispatch(createContact(currentContact));
      dispatch(clearCurrentContact());
      navigate('/');
    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h3 className="text-2xl font-bold mb-6 text-center">افزودن مخاطب جدید</h3>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullname"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.fullname ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="نام کامل*"
              value={currentContact.fullname}
              onChange={handleChange}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="photo"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.photo ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="آدرس تصویر"
              value={currentContact.photo}
              onChange={handleChange}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="mobile"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.mobile ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="موبایل*"
              value={currentContact.mobile}
              onChange={handleChange}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="ایمیل"
              value={currentContact.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="job"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.job ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="شغل"
              value={currentContact.job}
              onChange={handleChange}
            />
            {errors.job && (
              <p className="text-red-500 text-sm mt-1">{errors.job}</p>
            )}
          </div>

          <div>
            <select
              name="group"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.group ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
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
            {errors.group && (
              <p className="text-red-500 text-sm mt-1">{errors.group}</p>
            )}
          </div>

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