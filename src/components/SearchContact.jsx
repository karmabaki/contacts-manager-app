import { useSelector, useDispatch } from 'react-redux';
import { setQuery, filterContacts } from '../redux/slices/contactSlice';

const SearchContact = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.contacts);

  const handleChange = (e) => {
    const newQuery = { text: e.target.value };
    dispatch(setQuery(newQuery));
    dispatch(filterContacts());
  };

  return (
    <div className="text-center my-6">
      <input
        type="text"
        className="border rounded-lg p-2"
        placeholder="جستجوی مخاطب ..."
        value={query.text}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchContact;