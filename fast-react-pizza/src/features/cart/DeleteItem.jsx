import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';
import { useDispatch } from 'react-redux';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDeletePizza() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <Button onClick={handleDeletePizza} type="small">
      Delete
    </Button>
  );
}

export default DeleteItem;
