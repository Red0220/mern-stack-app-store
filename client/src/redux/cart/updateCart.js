const addDecimal = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
    if(!Array.isArray(state.cartItems)) {
        state.cartItems = [];
    }
    state.itemsPrice = addDecimal(state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0))

    state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
    state.taxPrice = addDecimal(0.15 * state.itemsPrice);
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);
    
    return state;
}