import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decrease, increase } from './cartSlice';

function UpdateCartQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();

  function handleDecrease() {
    dispatch(decrease(pizzaId));
  }

  function handleIncrease() {
    dispatch(increase(pizzaId));
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button onClick={handleDecrease} type="round">
        -
      </Button>
      <span className="text-sm font-semibold">{quantity}</span>
      <Button onClick={handleIncrease} type="round">
        +
      </Button>
    </div>
  );
}

export default UpdateCartQuantity;
