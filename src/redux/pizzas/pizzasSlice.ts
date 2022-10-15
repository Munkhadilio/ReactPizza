import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asynsActions";
import { Pizza, pizzasSliceState, Status } from "./types";

const initialState: pizzasSliceState = {
    items: [],
    status: Status.LOADING //loading | success | error
}



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



export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;