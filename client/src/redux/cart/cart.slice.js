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
            
            if(!action.payload) return;
            const {_id, quantity }= action.payload;
            
            const existingItem = state.cartItems.findIndex(item => item._id === _id );

            if (existingItem >= 0) {
                state.cartItems[existingItem].quantity += quantity;
            } else {
                state.cartItems.push({ ...action.payload, quantity});
            }
            state.totalQuantity += quantity;
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
        setTotalQuantity : (state, action) => {
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

export const { addToCart, removeFromCart, setTotalQuantity, clearCart, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;