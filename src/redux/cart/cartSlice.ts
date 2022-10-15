import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartLS } from "../../utils/getCartLS";
import { CartItem, CartSliceState } from "./types";



const cartData = getCartLS()

const initialState: CartSliceState = {
    totalPrice: cartData.totalPrice,
    items: cartData.items,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addProduct(state, action: PayloadAction<CartItem>) {
            const findProduct = state.items.find(obj => obj.id === action.payload.id)

            if (findProduct) {
                findProduct.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = calcTotalPrice(state.items);

        },
        minusProduct(state, action: PayloadAction<string>) {
            const findProduct = state.items.find(obj => obj.id === action.payload)

            if (findProduct) {
                findProduct.count--
            }
        },
        removeProduct(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id === action.payload)
        },
        clearItems(state, action) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

export const { addProduct, removeProduct, clearItems, minusProduct } = cartSlice.actions;

export default cartSlice.reducer;