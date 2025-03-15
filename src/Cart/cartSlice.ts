import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from '../redux/store';

// Định nghĩa kiểu dữ liệu sản phẩm trong giỏ hàng
import { iProduct } from '../types/product';

interface CartProduct extends iProduct {
    quantity: number;
}

// Adapter cho giỏ hàng
const cartAdapter = createEntityAdapter<CartProduct>();

// Khởi tạo state ban đầu
const initialState = cartAdapter.getInitialState();

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartProduct>) => {
            const { id, quantity } = action.payload;
            const existingItem = state.entities[id];

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cartAdapter.addOne(state, { ...action.payload, quantity });
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            cartAdapter.removeOne(state, action.payload);
        },
        clearCart: (state) => {
            cartAdapter.removeAll(state);
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Selectors
export const {
    selectAll: selectCartItems,
    selectById: selectCartItemById,
    selectTotal: selectCartTotal,
} = cartAdapter.getSelectors((state: RootState) => state.cart);

export default cartSlice.reducer;