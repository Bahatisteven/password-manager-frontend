import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// fetch all vault items 
const fetchVaultItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/items`);
  return response.data;
};


// fetch a single vault item
const fetchVaultItem = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/items/${id}`);
  return response.data;
};


// add a new vault item
const addVaultItem = async (item) => {
  const response = await axios.post(`${API_BASE_URL}/items`, item);
  return response.data;
};


// delete a vault item 
const deleteVaultItem = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/items/${id}`);
  return response.data;
};


// fetch metrics
const getMetrics = async () => {
  const response = await axios.get(`${REACT_APP_METRICS_URL}`);
  return response.data;
};


export {fetchVaultItems, fetchVaultItem, addVaultItem, deleteVaultItem, getMetrics}