import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// get all vault items
export const fetchVaultItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/items`, { withCredentials: true });
  return response.data;
};

// get a single vault item
export const fetchVaultItem = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/items/${id}`, { withCredentials: true });
  return response.data;
};

// add a new vault item
export const addVaultItem = async (item) => {
  const response = await axios.post(`${API_BASE_URL}/items`, item, { withCredentials: true });
  return response.data;
};

// update an existing vault item s
export const updateVaultItem = async (id, item) => {
  const response = await axios.put(`${API_BASE_URL}/items/${id}`, item, { withCredentials: true });
  return response.data;
};

// delete a vault item
export const deleteVaultItem = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/items/${id}`, { withCredentials: true });
  return response.data;
};