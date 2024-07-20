import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ["Entertainment", "Healthcare", "Travel", "Food", "Shopping", 
    "Utilities", "Transportation", "Salary", "Rent", "Investment", "Freelance","Education"];

function AddPage({ data, setData }) {
  const [type, setType] = useState('income');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      id: data.length + 1,
      Type: type,
      Date: date,
      Amount: parseFloat(amount),
      Category: category,
      Title: title,
      Notes: notes
    };
    setData([...data, newItem]);
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <button
            type="button"
            onClick={() => setType(type === 'income' ? 'expense' : 'income')}
            style={{
              backgroundColor: type === 'income' ? 'green' : 'red',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            {type === 'income' ? 'INCOME' : 'EXPENSE'}
          </button>
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} step="0.01" required />
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Notes:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddPage;
