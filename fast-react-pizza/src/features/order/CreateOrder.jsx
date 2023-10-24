import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart, getCart, getCartTotal } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAdddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    address,
    status: addressStatus,
    error,
    position,
  } = useSelector((state) => state.user);
  const cart = useSelector(getCart);
  const cartPrice = useSelector(getCartTotal);
  const isSubmitting = useNavigation().state === 'submitting';
  const formErrors = useActionData();
  const dispatch = useDispatch();

  // Actual price might be different as I don't know the exact formula used by the API
  const finalCartPrice = withPriority ? Math.round(cartPrice * 1.2) : cartPrice;
  const isLoadingAddress = addressStatus === 'loading';

  if (cart.length < 1) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-center text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            defaultValue={username}
            className="input grow"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" className="input w-full" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              className="input w-full"
              disabled={isLoadingAddress}
              name="address"
              defaultValue={address}
              required
            />
            {addressStatus === 'failed' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>

          {!!address || (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAdddress());
                }}
              >
                Get Address
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none
            focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            Order now {formatCurrency(finalCartPrice)}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const order = {
    ...data,
    priority: data.priority === 'true',
    cart: JSON.parse(data.cart),
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (Object.keys(errors).length > 0) return errors;

  var newOrder = await createOrder(order);

  // Careful! Importing the store directly is an anti-pattern as it disables
  // the store performance optimizations for this component (page)
  store.dispatch(emptyCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
