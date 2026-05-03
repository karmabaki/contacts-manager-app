import React from 'react';
import { Link } from 'react-router-dom';

const Contact = ({ contact, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-5 flex flex-col items-center text-center border border-gray-100">
      <img
        src={contact.photo || 'https://via.placeholder.com/80'}
        alt={contact.fullname}
        className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-200"
      />
      <h5 className="text-lg font-semibold text-gray-800 mb-1">{contact.fullname}</h5>
      <p className="text-gray-500 text-sm mb-4">{contact.mobile}</p>
      <div className="flex gap-2 mt-auto">
        <Link
          to={`/contacts/${contact.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded transition-colors"
        >
          مشاهده
        </Link>
        <Link
          to={`/contacts/edit/${contact.id}`}
          className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-3 py-1.5 rounded transition-colors"
        >
          ویرایش
        </Link>
        <button
          onClick={() => onDelete(contact.id, contact.fullname)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded transition-colors"
        >
          حذف
        </button>
      </div>
    </div>
  );
};

export default Contact;