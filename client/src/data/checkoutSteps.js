import { FaShoppingCart, FaTruck, FaCreditCard } from 'react-icons/fa';

export const CHECKOUT_STEPS = [
  {
    key: 'cart',
    label: 'Cart',
    icon: FaShoppingCart,
    isAllowed: () => true,
  },
  {
    key: 'shipping',
    label: 'Shipping',
    icon: FaTruck,
    isAllowed: ({ cartItems }) => cartItems.length > 0,

  },
  {
    key: 'order',
    label: 'Order',
    icon: FaCreditCard,
    isAllowed: ({cartItems, shippingAddress }) => cartItems.length > 0 && shippingAddress && Object.keys(shippingAddress).length > 0,
  },
];
