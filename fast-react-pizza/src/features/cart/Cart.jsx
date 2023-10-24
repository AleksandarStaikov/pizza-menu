import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from './cartSlice';

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(emptyCart());
  }

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {cart.length === 0 ? (
        <h2 className="mt-7 text-xl font-semibold">Your cart is empty</h2>
      ) : (
        <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      )}

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      {cart.length ? (
        <div className="mt-6 flex justify-between">
          <Button onClick={handleClearCart} type="secondary">
            Clear cart
          </Button>
          <Button to="/order/new" type="primary">
            Order pizzas
          </Button>
        </div>
      ) : (
        <div className="mt-6 flex justify-end">
          <Button type="primary" to="/menu">
            Add pizzas
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
