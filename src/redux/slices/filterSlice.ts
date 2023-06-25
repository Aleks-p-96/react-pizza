import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SearchPizzaParams } from "../../pages/Home";
import { sortlist } from "../../components/Sort";

type Sort = {
  name: string;
  sortProperty: "rating" | "title" | "price";
  order: "asc" | "desc";
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sort: Sort;
  currentPage: number;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
    order: "asc",
  },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort.name = action.payload.name;
      state.sort.sortProperty = action.payload.sortProperty;
    },
    changeOrder(state) {
      state.sort.order = state.sort.order === "asc" ? "desc" : "asc";
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    // NEED UPDATE
    setFilters(state, action: PayloadAction<SearchPizzaParams>) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort.order = action.payload.order;
      state.sort.sortProperty = action.payload.sortProperty;
      const i = sortlist.findIndex((obj) => obj.sortProperty === action.payload.sortProperty);
      if (i) {
        state.sort.name = sortlist[i].name
      }
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  changeOrder,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
