import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const { product, size, quantity } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === product.id && item.size === size);

            if (existingItemIndex > -1) {
                state.items[existingItemIndex].quantity += quantity;
            } else {
                state.items.push({ ...product, size, quantity, checked: false });
            }

            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeItemFromCart: (state, action) => {
            const { id, size } = action.payload;
            state.items = state.items.filter(item => !(item.id === id && item.size === size));
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cartItems');
        },
        incrementItemQuantity: (state, action) => {
            const { id, size } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === id && item.size === size);

            if (existingItemIndex > -1) {
                state.items[existingItemIndex].quantity += 1;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },
        decrementItemQuantity: (state, action) => {
            const { id, size } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === id && item.size === size);

            if (existingItemIndex > -1 && state.items[existingItemIndex].quantity > 1) {
                state.items[existingItemIndex].quantity -= 1;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },
        toggleItemChecked: (state, action) => {
            const { id, size } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === id && item.size === size);

            if (existingItemIndex > -1) {
                state.items[existingItemIndex].checked = !state.items[existingItemIndex].checked;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart, incrementItemQuantity, decrementItemQuantity, toggleItemChecked } = cartSlice.actions;
export default cartSlice.reducer;
