import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateContact } from '../../redux/slices/contactSlice';
import Spinner from '../Spinner';

const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.contacts);
  const { groups, loading } = useSelector((state) => state.ui);

  const [form, setForm] = useState(null);
  const [found, setFound] = useState(false);

  useEffect(() => {

    if (items.length === 0) return;

  
    const contact = items.find((c) => c.id == contactId);

    if (contact) {
      
      setForm({ ...contact });
      setFound(true);
    } else {
      
      setFound(false);
    }
  }, [contactId, items]);

  if (items.length === 0) {
    return <Spinner />;
  }

  if (!found) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 mb-4">مخاطب مورد نظر یافت نشد.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          بازگشت به لیست
        </button>
      </div>
    );
  }

  if (!form) {
    return <Spinner />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullname || !form.mobile) {
      alert('نام و موبایل الزامی است');
      return;
    }

    const resultAction = await dispatch(
      updateContact({ contactId: contactId, contact: form })
    );

    if (updateContact.fulfilled.match(resultAction)) {
      navigate('/');
    } else {
      alert('ویرایش انجام نشد: ' + (resultAction.payload || 'خطای ناشناخته'));
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h3 className="text-2xl font-bold mb-6 text-center">ویرایش مخاطب</h3>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullname"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="نام کامل*"
            value={form.fullname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="photo"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="آدرس تصویر"
            value={form.photo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobile"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="موبایل*"
            value={form.mobile}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="ایمیل"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="job"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="شغل"
            value={form.job}
            onChange={handleChange}
          />
          <select
            name="group"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={form.group}
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
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow"
            >
              ذخیره تغییرات
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
            >
              انصراف
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditContact;