export type CartItem = {
    id: string;
    title: string;
    type: string;
    price: number;
    imageUrl: string;
    sizes: number;
    count: number;
}

export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
} // Когда типизируют State, его делают interface'ом