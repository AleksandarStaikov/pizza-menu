import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart is empty</h2>

      <div className="mt-6 flex justify-end">
        <Button type="primary" to="/menu">
          Add pizzas
        </Button>
      </div>
    </div>
  );
}

export default EmptyCart;
