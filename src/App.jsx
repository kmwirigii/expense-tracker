import React, { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2025-04-01', description: 'Groceries', amount: 85, category: 'Food' },
    { id: 2, date: '2025-04-03', description: 'Gas', amount: 45, category: 'Transportation' },
  ]);
  
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  
  const [search, setSearch] = useState("");
  
  const [sortBy, setSortBy] = useState(""); 
  const [sortDirection, setSortDirection] = useState("asc"); 

  function addExpense(event) {
    event.preventDefault();
    
    const newExpense = {
      id: expenses.length + 1,
      date: date,
      description: description,
      amount: Number(amount),
      category: category
    };
    
    setExpenses([...expenses, newExpense]);
    
    setDate("");
    setDescription("");
    setAmount("");
    setCategory("");
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }
  
  function handleSort(field) {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  }
  
  function getFilteredExpenses() {
    return expenses.filter(expense => {
      const searchLower = search.toLowerCase();
      return expense.description.toLowerCase().includes(searchLower) || 
             expense.category.toLowerCase().includes(searchLower);
    });
  }
  
  function getSortedExpenses() {
    const filtered = getFilteredExpenses();
    
    if (!sortBy) {
      return filtered;
    }
    
    const sorted = [...filtered];
    
    sorted.sort(function(a, b) {
      let valueA = a[sortBy];
      let valueB = b[sortBy];
      
      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
      }
      if (typeof valueB === "string") {
        valueB = valueB.toLowerCase();
      }
      
      if (sortDirection === "asc") {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      } else {
        if (valueA > valueB) return -1;
        if (valueA < valueB) return 1;
        return 0;
      }
    });
    
    return sorted;
  }
  
  function deleteExpense(id) {
    const newExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(newExpenses);
  }

  const displayExpenses = getSortedExpenses();
  
  function getSortIndicator(field) {
    if (sortBy !== field) {
      return null;
    }
    return sortDirection === "asc" ? " ▲" : " ▼";
  }

  return (
    <div className="container">
      <h1>My Expense Tracker</h1>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      
      <div className="expenses-section">
        <h2>My Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th className="sortable" onClick={() => handleSort("description")}>
                Description {getSortIndicator("description")}
              </th>
              <th>Amount</th>
              <th className="sortable" onClick={() => handleSort("category")}>
                Category {getSortIndicator("category")}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayExpenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>Ksh {expense.amount}</td> {/* Changed to Ksh */}
                <td>{expense.category}</td>
                <td>
                  <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="form-section">
        <h2>Add New Expense</h2>
        <form onSubmit={addExpense}>
          <div className="form-group">
            <label>Date:</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Description:</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Amount:</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Category:</label>
            <input 
              type="text" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
}

export default App;
