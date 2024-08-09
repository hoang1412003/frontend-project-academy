import { createSlice } from "@reduxjs/toolkit";

// Trạng thái khởi tạo cho giỏ hàng, lấy từ localStorage nếu có
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
            // Xóa sản phẩm khỏi giỏ hàng
            state.items = state.items.filter(item => !(item.id === id && item.size === size));
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            // Xóa tất cả sản phẩm trong giỏ hàng
            state.items = [];
            localStorage.removeItem('cartItems'); // Xóa giỏ hàng khỏi localStorage
        },
        incrementItemQuantity: (state, action) => {
            const { id, size } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === id && item.size === size);

            if (existingItemIndex > -1) {
                // Tăng số lượng sản phẩm trong giỏ hàng
                state.items[existingItemIndex].quantity += 1;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },
        decrementItemQuantity: (state, action) => {
            const { id, size } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === id && item.size === size);

            if (existingItemIndex > -1 && state.items[existingItemIndex].quantity > 1) {
                // Giảm số lượng sản phẩm trong giỏ hàng nếu số lượng lớn hơn 1
                state.items[existingItemIndex].quantity -= 1;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart, incrementItemQuantity, decrementItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
