import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza } from "./types";

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