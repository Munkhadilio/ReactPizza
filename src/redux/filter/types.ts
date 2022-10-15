export enum SortPropEnum {
    RATING = 'rating',
    TITLE = 'title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export type Sort = {
    name: string;
    sortProp: SortPropEnum;
}

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort;
}