import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [orderNumber, setOrderNumer] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!orderNumber) return;

    navigate(`/order/${orderNumber}`);
    setOrderNumer('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={orderNumber}
        onChange={(e) => setOrderNumer(e.target.value)}
        className="ring:opacity-50 w-28 rounded-full px-4 py-2 text-sm 
        transition-all duration-300 placeholder:text-stone-400 focus:outline-none
        focus:ring focus:ring-yellow-500 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
