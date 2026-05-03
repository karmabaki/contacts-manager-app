import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, filterContacts } from '../../redux/slices/contactSlice';

const SearchContact = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.contacts);

  const handleChange = (e) => {
    const newQuery = { text: e.target.value };
    dispatch(setQuery(newQuery));
    dispatch(filterContacts());
  };

  return (
    <div className="input-group my-3">
      <input
        type="text"
        className="form-control"
        placeholder="جستجوی مخاطب ..."
        value={query.text}
        onChange={handleChange}
      />
      <span className="input-group-text">
        <i className="fa fa-search"></i>
      </span>
    </div>
  );
};

export default SearchContact;