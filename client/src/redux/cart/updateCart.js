
export const updateCart = (state) => {
    if(!Array.isArray(state.cartItems)) {
        state.cartItems = [];
    }

    // price in cents
    const itemsPriceCents = state.cartItems.reduce((acc, item) =>{
        if(!Number.isInteger(item.price) || !Number.isInteger(item.quantity)) {
            throw new Error("Item price and quantity must be integers");
        }
        return acc + (item.price * item.quantity);
    }, 0);

    const shippingPriceCents = 0; // Free shipping for simplicity
    const taxPriceCents = 0;
    const totalPriceCents = itemsPriceCents + shippingPriceCents + taxPriceCents;

    state.itemsPrice = itemsPriceCents;
    state.shippingPrice = shippingPriceCents;
    state.taxPrice = taxPriceCents;
    state.totalPrice = totalPriceCents;
    
    return state;
}