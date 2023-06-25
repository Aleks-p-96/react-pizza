import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, order, search , currentPage} = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://6429ff9c00dfa3b5473de2b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `
    );
    // console.log(thunkApi)
    return data;
  }
);

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',

}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading, | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;