import { useSelector, useDispatch } from 'react-redux';
import { setQuery, filterContacts } from '../redux/slices/contactSlice';
import { debounce } from 'lodash';
import { useCallback } from 'react';

const SearchContact = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.contacts);

  const debouncedFilter = useCallback(
    debounce(()=> dispatch(filterContacts()),1000)
  )

  const handleChange = (e) => {
    const newQuery = e.target.value ;
    dispatch(setQuery({text: newQuery}));
    debouncedFilter();
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