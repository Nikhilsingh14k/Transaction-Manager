import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import EditPage from './EditPage';
import AddPage from './AddPage';
import { transactionData } from './transactionData';
import Navbar from './Navbar'; 

function App() {
  const [data, setData] = useState(transactionData);

  const updateData = (updatedItem) => {
    setData(data.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar /> 
        <div className="content-container">
          <Routes>
            <Route path="/" element={<HomePage data={data} setData={setData} />} />
            <Route path="/edit/:id" element={<EditPage data={data} updateData={updateData} />} />
            <Route path="/add" element={<AddPage data={data} setData={setData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
