import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createContact} from '../../redux/slices/contactSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactSchema } from '../../validations/contactValidation';
import Spinner from '../Spinner';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groups, loading } = useSelector((state) => state.ui);
  const [isSaving, setIsSaving] = useState(false);

const initialValues = {
    fullname: '',
    photo: '',
    mobile: '',
    email: '',
    job: '',
    group: '',
  };

  const handleSubmit = async (values, { setSubmitting}) => {
    setIsSaving(true);
    try {
      await dispatch(createContact(values)).unwrap();
      toast.success('مخاطب با موفقیت ساخته شد')

      navigate('/');
    } catch (err) {
      toast.error('خطا در ساخت مخاطب')
      }
       finally {
      setSubmitting(false);
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h3 className="text-2xl font-bold mb-6 text-center">افزودن مخاطب جدید</h3>
      {loading ? (
        <Spinner />
      ) : (
        <Formik
        initialValues={initialValues}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}
        >
        {({ isSubmitting }) => (
          <Form className='space-y-4'>
            <div>
              <Field
                type="text"
                name="fullname"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="نام کامل*"/>
              <ErrorMessage name='fullname' component="p" className='text-red-500 text-sm mt-1'/>
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
                  disabled={isSubmitting || isSaving}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg shadow transition-colors disabled:opacity-50"
                >
                {isSaving ? 'در حال ایجاد مخاطب...' : 'ایجاد مخاطب'}
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
      )}
    </div>
  );
};

export default AddContact;