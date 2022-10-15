import { CartItem } from "../redux/cart/types"

export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0) //начальное значение sum, sum это предыдущая пицца и она сумируется с каждым разом
}