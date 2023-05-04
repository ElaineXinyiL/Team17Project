import React, { useState, useEffect } from "react";
import "./styles.css";

function getItemsFromLocalStorage() {
  // getting stored value
  const saved = localStorage.getItem("items");
  const initialValue = JSON.parse(saved) || [];
  // relabel the keys from 0 to length-1
  for (let i = 0; i < initialValue.length; i++) {
    initialValue[i]["itemId"] = i;
  }
  return initialValue || [];
}

export default function Transaction() {
  const [items, setItems] = useState(getItemsFromLocalStorage);
  const [numKeys, setNumKeys] = useState(() => items.length);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  /**
   * add an item to the transaction
   * written by Yixuan He
   */
  function handleAddTransaction() {
    let newItem = {
      itemId: numKeys,
      amount: amount,
      category: category,
      date: date,
      description: description,
    };
    setNumKeys(numKeys + 1);
    setItems([newItem, ...items]); // using the spread operator ...
  }

  /**
   * delete an item from the transaction
   * written by Yixuan He
   */
  function handleDeleteTransaction(key) {
    console.log(key);
    const newItems = items.filter((x) => x["itemId"] !== key);
    setItems(newItems);
    setNumKeys(numKeys - 1);
  }

  /**
   * update the amount
   * written by Yixuan He
   */
  useEffect(() => {
    // storing items if items changes value
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="App container">
      <h1 className="bg-warning text-center p-2">Transaction</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((transaction) => (
            <tr key={transaction.itemId}>
              <td>{transaction.itemId}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>
                <button
                  onClick={() => handleDeleteTransaction(transaction.itemId)}
                  class="btn btn-primary"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2> add new transaction </h2>
      <form class="mb-3 g-3" onSubmit={handleAddTransaction}>
        <div class="col-md-6">
          <label class="form-label">
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              class="form-control"
            />
          </label>
        </div>
        <div class="col-md-6">
          <label class="form-label">
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              class="form-control"
            />
          </label>
        </div>
        <div class="col-md-6">
          <label class="form-label">
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              class="form-control"
            />
          </label>
        </div>
        <div class="col-md-6">
          <label class="form-label">
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              class="form-control"
            />
          </label>
        </div>
        <button type="submit" class="btn btn-primary">Add Transaction</button>
      </form>
    </div>
  );
}