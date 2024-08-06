import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    currentPage: 1,
    status: "start",
    error: "",
    totalPage: 30,
    searchQuery: ''
};

const url = "https://66a8534f53c13f22a3d25bb3.mockapi.io/product";

export const fetchProucts = createAsyncThunk('products/fetchProucts', async ({ page, limit, searchQuery }) => {
    // Tạo tham số truy vấn từ searchQuery
    const queryString = new URLSearchParams({
        ...(searchQuery && { search: searchQuery })
    }).toString();

    const res = await axios.get(`${url}?page=${page}&limit=${limit}&${queryString}`);
    return res.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await axios.delete(url + '/' + id);
    return id;
});

export const addNewProduct = createAsyncThunk('products/addNewProduct', async (product) => {
    const res = await axios.post(url, product);
    return res.data;
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProucts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProucts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProucts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(item => item.id !== action.payload);
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.products = [...state.products, action.payload];
            });
    }
});

export const { setSearchQuery } = productsSlice.actions;

export default productsSlice.reducer;
