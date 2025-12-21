import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from './updateCart';


const initialState = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: 'PayPal',
    totalQuantity: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            if (!action.payload) return;
            const { id, quantity } = action.payload;
            console.log('Adding to cart:', id, 'Quantity:', quantity);

            const existingItem = state.cartItems.findIndex(item => item.id === id);

            if (existingItem >= 0) {
                state.cartItems[existingItem].quantity += quantity;
            } else {
                state.cartItems.push({ ...action.payload, quantity });
            }
            state.totalQuantity += quantity;
            updateCart(state);


        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            if (!existingItem) return;
            state.totalQuantity -= existingItem.quantity;
            state.cartItems = state.cartItems.filter(item => item.id !== id)

            updateCart(state);
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload);
            if (!item) return;
            item.quantity += 1;
            state.totalQuantity += 1;
            updateCart(state);
        },
        decrementQuantity: (state, action) => {
            console.log("Decrementing item with id:", action.payload);
            const item = state.cartItems.find(item => item.id === action.payload);
            if (!item) return;
            if (item.quantity === 1) {
                state.totalQuantity -= 1;
                state.cartItems = state.cartItems.filter(i => i.id !== item.id);
            } else {
                item.quantity -= 1;
                state.totalQuantity -= 1;
            }
            updateCart(state);
        },
        setTotalQuantity: (state, action) => {
            const { id, quantity } = action.payload;

            const item = state.cartItems.findIndex(item => item.id === id);
            if (!item) return;
            state.totalQuantity += quantity - item.quantity;
            item.quantity = quantity;
            updateCart(state)
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        }
    }
})

export const {
    addToCart, 
    removeFromCart,
    setTotalQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    saveShippingAddress,
    savePaymentMethod
     } = cartSlice.actions;

export default cartSlice.reducer;