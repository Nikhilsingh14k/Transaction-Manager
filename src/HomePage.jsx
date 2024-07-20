import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExpensePieChart from './ExpensePieChart'; 
import IncomeExpensePieChart from './IncomeExpensePieChart'; 

function HomePage({ data, setData }) {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('6'); 
  const [yearFilter, setYearFilter] = useState('2024'); 
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleMonthChange = (direction) => {
    const currentMonth = parseInt(monthFilter, 10);
    const currentYear = parseInt(yearFilter, 10);
    
    if (direction === 'prev') {
      if (currentMonth === 1) {
        setMonthFilter('12');
        setYearFilter((currentYear - 1).toString());
      } else {
        setMonthFilter((currentMonth - 1).toString());
      }
    } else {
      if (currentMonth === 12) {
        setMonthFilter('1');
        setYearFilter((currentYear + 1).toString());
      } else {
        setMonthFilter((currentMonth + 1).toString());
      }
    }
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.Date);
    const itemMonth = itemDate.getMonth() + 1; 
    const itemYear = itemDate.getFullYear();

    const isCategoryMatch = categoryFilter ? item.Category === categoryFilter : true;
    const isMinPriceMatch = minPriceFilter ? item.Amount >= parseFloat(minPriceFilter) : true;
    const isMaxPriceMatch = maxPriceFilter ? item.Amount <= parseFloat(maxPriceFilter) : true;
    const isMonthMatch = monthFilter ? itemMonth === parseInt(monthFilter) : true;
    const isYearMatch = yearFilter ? itemYear === parseInt(yearFilter) : true;

    return isCategoryMatch && isMinPriceMatch && isMaxPriceMatch && isMonthMatch && isYearMatch;
  });

  const totalIncome = filteredData
    .filter(item => item.Type === 'income')
    .reduce((acc, item) => acc + parseFloat(item.Amount), 0);

  const totalExpense = filteredData
    .filter(item => item.Type === 'expense')
    .reduce((acc, item) => acc + parseFloat(item.Amount), 0);

  const groupedData = filteredData.reduce((acc, item) => {
    const date = item.Date.split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));

  const categoryData = filteredData
    .filter(item => item.Type === 'expense')
    .reduce((acc, item) => {
      acc[item.Category] = (acc[item.Category] || 0) + parseFloat(item.Amount);
      return acc;
    }, {});

  return (
    <div>
     

      <div className="filter-container">
        <div className="chart-container">
          <IncomeExpensePieChart totalIncome={totalIncome} totalExpense={totalExpense} />
        </div>
        <div className="chart-container">
        <ExpensePieChart categoryData={categoryData} />
      </div>
      </div>

      <div className="filter-container">
        <div className='income-amount '><strong>Total Income:</strong> ₹{totalIncome.toFixed(2)}</div>
        <div className='expense-amount'><strong>Total Expense:</strong> ₹{totalExpense.toFixed(2)}</div>
      </div>

      <div className="filter-container">
        <button onClick={() => handleMonthChange('prev')}>Prev</button>
        <div>
          <label>
            Month:
            <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
              <option value="">All</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {new Date(0, month - 1).toLocaleString('default', { month: 'long' })} {yearFilter}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button onClick={() => handleMonthChange('next')}>Next</button>
      </div>

      <div className="filter-container2">
        <div>
          <label>
            Category:
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
              <option value="Transportation">Transportation</option>
              <option value="Salary">Salary</option>
              <option value="Rent">Rent</option>
              <option value="Investment">Investment</option>
              <option value="Freelance">Freelance</option>
              <option value="Education">Education</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Min Price:
            <input
              type="number"
              value={minPriceFilter}
              onChange={(e) => setMinPriceFilter(e.target.value)}
              step="1"
            />
          </label>
        </div>
        <div>
          <label>
            Max Price:
            <input
              type="number"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(e.target.value)}
              step="1"
            />
          </label>
        </div>
        <div>
          <label>
            Year:
            <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
              <option value="">All</option>
              {Array.from(new Set(data.map(item => new Date(item.Date).getFullYear()))).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <table className="table">
        <tbody>
          {sortedDates.map((date) => (
            <React.Fragment key={date}>
              <tr>
                <td colSpan="5"><strong>{date}</strong></td>
              </tr>
              {groupedData[date].map((item, index) => (
                <tr key={index}>
                  <td className="grow1">{item.Category}</td>
                  <td className="grow">{item.Title}</td>
                  <td className={item.Type === 'income' ? 'income-amount' : 'expense-amount'}>
                    {item.Amount}
                  </td>
                  <td className="grow2">
                    <Link to={`/edit/${item.id}`} className="btn btn-primary">
                      Edit
                    </Link>
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
