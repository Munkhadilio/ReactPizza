import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const { category,
            order,
            sortBy,
            search,
            currentPage } = params

        const { data } = await axios.get(`https://630f6d6037925634188f6c61.mockapi.io/items?page=${currentPage}
        &limit=8${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState = {
    items: [],
    status: 'loading' //loading | success | error
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;

        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error'
            state.items = []
        }
    }
});

export const selectorPizzas = (state) => state.pizzas

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;