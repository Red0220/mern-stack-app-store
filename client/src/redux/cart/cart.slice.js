import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from './updateCart';


const initialState = {
    cartItems: [],
    shoppingAddress: {},
    paymentMethod: 'PayPal',
    totalQuantity: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state, action) => {
            const newItem = action.payload._id;
            const existingItem = state.cartItems.findIndex(item => item._id === newItem);

            if (existingItem >= 0) {
                state.cartItems[existingItem].quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            state.totalQuantity += 1;
            updateCart(state);
        },
        removeFromCart : (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item._id === id);
             if(!existingItem) return;
             state.totalQuantity -= state.cartItems[existingItem].quantity;
             state.cartItems = state.cartItems.filter(item => item._id !== id);
             updateCart(state);
        },
        setQuantity : (state, action) => {
            const { id, quantity } = action.payload;

            const existingItem = state.cartItems.findIndex(item => item._id === id);
            if(existingItem !== -1 && quantity >= 1) {
                state.totalQuantity  += quantity - state.cartItems[existingItem].quantity;
                state.cartItems[existingItem].quantity = quantity;
            }
            updateCart(state)
        },
        clearCart : (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shoppingAddress = action.payload;
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        }
    }
})

export const { addToCart, removeFromCart, setQuantity, clearCart, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;