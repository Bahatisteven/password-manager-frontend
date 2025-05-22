import React, { useState, useEffect } from "react";
import { fetchVaultItems, addVaultItem, deleteVaultItem } from "../api";

const VaultItems = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", type: "", data: "" });
  const [loading, setLoading] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchVaultItems();
      setItems(data);
    } catch (error) {
      alert("Failed to fetch vault items.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!newItem.name || !newItem.type) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await addVaultItem(newItem);
      setNewItem({ name: "", type: "", data: "" });
      loadItems();
    } catch (errors) {
      alert("Failed to add vault item.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteVaultItem(id);
      loadItems();
    } catch (error) {
      alert("Failed to delete item.");
    }
  };

  return (
    <div>
      <h2>Vault Items</h2>
      <div>
        <input
          name="name"
          placeholder="Name"
          value={newItem.name}
          onChange={handleChange}
        />
        <input
          name="type"
          placeholder="Type"
          value={newItem.type}
          onChange={handleChange}
        />
        <input
          name="data"
          placeholder="Data"
          value={newItem.data}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Item</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items && items.length > 0 ? (
            items.map((item) => (
              <li key={item.id}>
                <b>{item.name}</b> ({item.type}) - {item.data}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No items found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default VaultItems;



