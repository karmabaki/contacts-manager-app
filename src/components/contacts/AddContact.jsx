import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createContact, setCurrentContact, clearCurrentContact } from '../../redux/slices/contactSlice';
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
    <div className="row my-3">
      <div className="col-md-8 offset-md-2">
        <h3 className="text-center">افزودن مخاطب جدید</h3>
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="fullname"
                className="form-control"
                placeholder="نام کامل*"
                value={currentContact.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="photo"
                className="form-control"
                placeholder="آدرس تصویر"
                value={currentContact.photo}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="mobile"
                className="form-control"
                placeholder="موبایل*"
                value={currentContact.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="ایمیل"
                value={currentContact.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="job"
                className="form-control"
                placeholder="شغل"
                value={currentContact.job}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <select
                name="group"
                className="form-control"
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
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm">
                ایجاد مخاطب
              </button>
              <button
                type="button"
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded transition-colors mr-4"
                onClick={() => navigate('/')}
              >
                انصراف
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddContact;