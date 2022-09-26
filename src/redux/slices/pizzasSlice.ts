import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios';
import { RootState } from "../store";

type Pizza = {
    id: string;
    title: string;
    types: number[];
    price: number;
    imageUrl: string;
    sizes: number[];
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface pizzasSliceState {
    items: Pizza[];
    status: Status;
}

const initialState: pizzasSliceState = {
    items: [],
    status: Status.LOADING //loading | success | error
}

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params: Record<string, string>) => {
        const { category,
            order,
            sortBy,
            search,
            currentPage } = params

        const { data } = await axios.get(`https://630f6d6037925634188f6c61.mockapi.io/items?page=${currentPage}
        &limit=8${category}&sortBy=${sortBy}&order=${order}${search}`);

        return data as Pizza[];
    }
)

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;

        },
    },

    extraReducers: (builder) => {

        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING
            state.items = []
        })

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS
        })

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR
            state.items = []
        })

    }

    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         state.status = 'loading'
    //         state.items = []
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.items = action.payload;
    //         state.status = 'success'
    //     },
    //     [fetchPizzas.rejected]: (state, action) => {
    //         state.status = 'error'
    //         state.items = []
    //     }
    // }

});

export const selectorPizzas = (state: RootState) => state.pizzas

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;