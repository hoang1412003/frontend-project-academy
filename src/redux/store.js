import { configureStore } from "@reduxjs/toolkit";
import productsReduce from "./productsSlice";
import cartReduce from "./cartSlice";

const store = configureStore({
    reducer: {
        products: productsReduce,
        cart: cartReduce
    }
});

export default store;
