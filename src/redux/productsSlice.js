import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    groupedProducts: {}, 
    currentPage: 1,
    status: "start",
    error: "",
    totalPage: 30,
    searchQuery: '',
    sortBy: 'default', 
    order: 'asc',
    selectedProduct: null       
};

const url = "https://66a8534f53c13f22a3d25bb3.mockapi.io/product";


export const fetchProucts = createAsyncThunk('products/fetchProucts', async ({ page, limit, searchQuery, sortBy, order }) => {
    const queryString = new URLSearchParams({
        ...(searchQuery && { search: searchQuery }),
        ...(sortBy && { sortBy: sortBy }), 
        ...(order && { order: order })     
    }).toString();

    const res = await axios.get(`${url}?page=${page}${limit ? `&limit=${limit}` : ''}&${queryString}`);
    return res.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const res = await axios.get(`${url}/${id}`);
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

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, ...updates }) => {
    const res = await axios.put(`${url}/${id}`, updates);
    return res.data;
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload; 
        },
        setOrder: (state, action) => {
            state.order = action.payload; 
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

                
                const groupedProducts = state.products.reduce((acc, product) => {
                    const category = product.category.trim();
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(product);
                    return acc;
                }, {});

                
                state.groupedProducts = Object.fromEntries(
                    Object.entries(groupedProducts).map(([category, items]) => [
                        category,
                        items.slice(0, 4) 
                    ])
                );
            })
            .addCase(fetchProucts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(item => item.id !== action.payload);
                
                
                const groupedProducts = state.products.reduce((acc, product) => {
                    const category = product.category.trim();
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(product);
                    return acc;
                }, {});
                
                state.groupedProducts = Object.fromEntries(
                    Object.entries(groupedProducts).map(([category, items]) => [
                        category,
                        items.slice(0, 4) 
                    ])
                );
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.products = [...state.products, action.payload];
                
                
                const groupedProducts = state.products.reduce((acc, product) => {
                    const category = product.category.trim();
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(product);
                    return acc;
                }, {});
                
                state.groupedProducts = Object.fromEntries(
                    Object.entries(groupedProducts).map(([category, items]) => [
                        category,
                        items.slice(0, 4) 
                    ])
                );
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.products = state.products.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
                
                
                const groupedProducts = state.products.reduce((acc, product) => {
                    const category = product.category.trim();
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(product);
                    return acc;
                }, {});
                
                state.groupedProducts = Object.fromEntries(
                    Object.entries(groupedProducts).map(([category, items]) => [
                        category,
                        items.slice(0, 4) 
                    ])
                );
            })
            .addCase(fetchProductById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedProduct = action.payload; 
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const { setSearchQuery, setSortBy, setOrder } = productsSlice.actions;

export default productsSlice.reducer;
