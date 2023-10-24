import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [
    // {
    //   pizzaId: 1,
    //   name: 'Margherita',
    //   quantity: 2,
    //   unitPrice: 12,
    // },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      const existingPizza = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );

      if (existingPizza) {
        existingPizza.quantity++;
        return;
      }

      state.cart.push({ ...action.payload, quantity: 1 });
    },
    deleteItem: (state, action) => {
      const pizzaId = action.payload;
      state.cart = state.cart.filter((item) => item.pizzaId !== pizzaId);
    },
    increase: (state, action) => {
      const pizzaId = action.payload;
      state.cart.find((item) => item.pizzaId === pizzaId).quantity++;
    },
    decrease: (state, action) => {
      const pizzaId = action.payload;
      const item = state.cart.find((item) => item.pizzaId === pizzaId);
      if (item.quantity === 1) {
        cartSlice.caseReducers.deleteItem(state, action);
      } else {
        item.quantity--;
      }
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const { addItem, deleteItem, increase, decrease, emptyCart } =
  cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export const getCartQuantity = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getCartTotal = (state) =>
  state.cart.cart.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0,
  );

export const getQuantityById = (pizzaId) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity ?? 0;
