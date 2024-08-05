import { configureStore } from "@reduxjs/toolkit";
import productsReduce from "./productsSlice";

const store = configureStore({
    reducer: {
        products: productsReduce
    }
});

export default store;
