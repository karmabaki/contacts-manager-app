import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:9000' });

export const getAllContacts = () => API.get('/contacts');
export const getContact = (id) => API.get(`/contacts/${id}`);
export const createContact = (contact) => API.post('/contacts', contact);
export const updateContact = (id, contact) => API.put(`/contacts/${id}`, contact);
export const removeContact = (id) => API.delete(`/contacts/${id}`);
export const getAllGroups = () => API.get('/groups');