import { FaShoppingCart, FaTruck, FaCreditCard } from 'react-icons/fa';

export const CHECKOUT_STEPS = [
  {
    key: 'cart',
    label: 'Cart',
    icon: FaShoppingCart,
    isAllowed: ({cartItems}) => cartItems.length > 0,
  },
  {
    key: 'shipping',
    label: 'Shipping',
    icon: FaTruck,
    isAllowed: ({ shippingAddress }) => !shippingAddress,

  },
  {
    key: 'order',
    label: 'Order',
    icon: FaCreditCard,
    isAllowed: ({ paymentMethod }) => !paymentMethod,
  },
];
