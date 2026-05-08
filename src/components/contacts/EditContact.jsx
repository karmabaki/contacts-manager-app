import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateContact } from '../../redux/slices/contactSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactSchema } from '../../validations/contactValidation';
import Spinner from '../Spinner';

const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.contacts);
  const { groups, loading } = useSelector((state) => state.ui);

  const [initialValues, setInitialValues] = useState(null);
  const [found, setFound] = useState(false);

  useEffect(() => {

    if (items.length === 0) return;

  
    const contact = items.find((c) => c.id == contactId);

    if (contact) {
      
      setInitialValues({
        fullname: contact.fullname || '',
        photo: contact.photo || '',
        mobile: contact.mobile || '',
        email: contact.email || '',
        job: contact.job || '',
        group: contact.group || '',
      });
      setFound(true);
    } else {
      
      setFound(false);
    }
  }, [contactId, items]);

  if (loading) return <Spinner />;

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

  if (!initialValues) {
    return <Spinner />;
  }


  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        updateContact({ contactId: contactId, contact: values })
      ).unwrap();
      navigate('/');
    } catch (err) {
      alert('ویرایش انجام نشد: ' + (err.message || 'خطای ناشناخته'));
    } finally {
      setSubmitting(false);
    }
  };

 return (
    <div className="max-w-lg mx-auto mt-8">
      <h3 className="text-2xl font-bold mb-6 text-center">ویرایش مخاطب</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            
            <div>
              <Field
                type="text"
                name="fullname"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="نام کامل*"
              />
              <ErrorMessage name="fullname" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field
                type="text"
                name="photo"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="آدرس تصویر"
              />
              <ErrorMessage name="photo" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field
                type="text"
                name="mobile"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="موبایل*"
              />
              <ErrorMessage name="mobile" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ایمیل"
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field
                type="text"
                name="job"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="شغل"
              />
              <ErrorMessage name="job" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field
                as="select"
                name="group"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">انتخاب گروه</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="group" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-lg shadow transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg transition-colors"
              >
                انصراف
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditContact;