import { configureStore } from '@reduxjs/toolkit'
import filter from './filter/filterSlice'
import cart from './cart/cartSlice'
import pizzas from './pizzas/pizzasSlice'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizzas
    }
})

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();