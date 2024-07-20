import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const categories = ["Entertainment", "Healthcare", "Travel", "Food", "Shopping", 
    "Utilities", "Transportation", "Salary", "Rent", "Investment", "Freelance", "Education"];

function EditPage({ data, updateData }) {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const currentItem = data.find(item => item.id === parseInt(id));
    setItem(currentItem);
  }, [id, data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedItem = {
      id: parseInt(id),
      Date: event.target.date.value,
      Category: event.target.category.value,
      Title: event.target.title.value,
      Amount: parseFloat(event.target.amount.value),
      Type: event.target.type.value,
      Notes: event.target.notes.value
    };
    updateData(updatedItem);
    navigate('/');
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="form-container">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" defaultValue={item.Date} required />
        </label>
        <label>
          Category:
          <select name="category" defaultValue={item.Category} required>
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Title:
          <input type="text" name="title" defaultValue={item.Title} required />
        </label>
        <label>
          Amount:
          <input type="number" name="amount" defaultValue={item.Amount} step="0.01" required />
        </label>
        <label>
          Type:
          <select name="type" defaultValue={item.Type} required>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label>
          Notes:
          <textarea name="notes" defaultValue={item.Notes}></textarea>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditPage;
