import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
    order: true,
  },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort.name = action.payload.name;
      state.sort.sortProperty = action.payload.sortProperty;
    },
    setOrder(state, action) {
      state.sort.order = !state.sort.order;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state,action) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort.name = action.payload.name;
      state.sort.sortProperty = action.payload.sortProperty;
      state.sort.order = action.payload.order === 'asc' ? true : false;
    }
  }
})

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setOrder, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;