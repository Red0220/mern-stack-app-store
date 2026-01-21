import { setTotalQuantity } from "../../client/src/redux/cart/cart.slice";

export const calculateTotal =  (items) => {
    const TAX_RATE = 0.1; // 10% tax
    // const SHIPPING_THRESHOLD = 0;
    
    const itemsPrice = items.reduce((total, item)=> total + item.price * item.quantity, 0);
    const taxPrice = parseFloat((itemsPrice * TAX_RATE).toFixed(2));

    const totalPrice = parseFloat((itemsPrice + taxPrice).toFixed(2));

    return {
        itemsPrice,
        taxPrice,
        totalPrice
    }

}