import React from "react";

export default function Stats({ items }) {
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = items.length && (packedItems / items.length) * 100;

  return (
    <footer className="stats">
      <em>
        💼 You have {items.length} items in your shopping list, and you already
        packed {packedItems} ({percentage}%)
      </em>
    </footer>
  );
}