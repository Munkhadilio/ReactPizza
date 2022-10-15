export type Pizza = {
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

export interface pizzasSliceState {
    items: Pizza[];
    status: Status;
}