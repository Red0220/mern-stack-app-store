import { FaShoppingCart, FaTruck, FaCreditCard } from 'react-icons/fa';

export const CHECKOUT_STEPS = [
  {
    key: 'cart',
    label: 'Cart',
    icon: FaShoppingCart,
  },
  {
    key: 'shipping',
    label: 'Shipping',
    icon: FaTruck,
  },
  {
    key: 'order',
    label: 'Order',
    icon: FaCreditCard,
  },
];
