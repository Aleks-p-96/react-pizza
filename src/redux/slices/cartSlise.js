import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const res = state.items.find(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.type === newItem.type
      );
      if (res) {
        res.count++;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    minusItem(state, action) {
      const res = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );
      res.count--;
      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    deleteItem(state, action) {
      const i = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );
      state.items.splice(i,1);
      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    }
  },
});

export const selectCart = (state) => state.cart;

export const selectCountById = (id) => (state) =>
  state.cart.items
    .filter((item) => item.id === id)
    .reduce((count, item) => count + item.count, 0);

export const { addItem, clearCart, minusItem, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;