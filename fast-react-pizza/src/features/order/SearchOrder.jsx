import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [orderNumber, setOrderNumer] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!orderNumber) return;

    navigate(`/order/${orderNumber}`);
    setOrderNumer("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={orderNumber}
        onChange={(e) => setOrderNumer(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
