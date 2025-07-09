import axios from 'axios';

const API_URL = 'http://localhost:4000/api/contacts';

// Create axios instance with common headers
const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

// GET all contacts
export const getContacts = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('GET Contacts Error:', error.response?.data || error.message);
    throw error;
  }
};

// POST new contact
export const createContact = async (contact) => {
  console.log("*********");
  try {
    const response = await api.post(API_URL, contact);
    return response.data;
  } catch (error) {
    console.error('CREATE Contact Error:', error.response?.data || error.message);
    throw error;
  }
};

// PUT update contact
export const updateContact = async (id, contact) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error('UPDATE Contact Error:', error.response?.data || error.message);
    throw error;
  }
};

// DELETE contact
export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('DELETE Contact Error:', error.response?.data || error.message);
    throw error;
  }
};