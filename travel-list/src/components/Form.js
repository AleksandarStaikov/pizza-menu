import React from "react";

export default function Form({ onAddItem }) {
    const [description, setDescription] = React.useState("");
    const [quantity, setQuantity] = React.useState(1);
  
    function handleSubmit(event) {
      event.preventDefault();
      if (!description.trim()) return;
  
      const newItem = {
        description,
        quantity,
        packed: false,
        id: Date.now(),
      };
  
      onAddItem(newItem);
  
      setDescription("");
      setQuantity(1);
    }
  
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip</h3>
  
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (v, i) => i + 1).map((number) => (
            <option value={number} key={number}>
              {number}
            </option>
          ))}
        </select>
  
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    );
  }