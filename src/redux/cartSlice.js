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

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItemIndex = state.items.findIndex(item => item.id === product.id && item.size === size);

            if (existingItemIndex > -1) {
                // Nếu sản phẩm đã tồn tại, cập nhật số lượng
                state.items[existingItemIndex].quantity += quantity;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
                state.items.push({ ...product, size, quantity });
            }

            // Lưu vào localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeItemFromCart: (state, action) => {
            const { id, size } = action.payload;
            state.items = state.items.filter(item => !(item.id === id && item.size === size));
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cartItems'); // Xóa giỏ hàng khỏi localStorage
        },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
