import { 
  FaBoxOpen, FaShoppingCart, FaUserEdit, FaUsers, 
  FaPlusSquare, FaChartBar, FaCog 
} from 'react-icons/fa'


export const adminLinks = [
  { icon: <FaUserEdit   />, text: "Account", to: "/dashboard?tab=profile", key: "profile" },
  { icon: <FaPlusSquare  />, text: "Add Product", to: "/dashboard?tab=addproduct", key: "addproduct" },
  { icon: <FaBoxOpen  />, text: "Products", to: "/dashboard?tab=products", key: "products" },
  { icon: <FaUsers  />, text: "Users", to: "/dashboard?tab=users", key: "users" },
  { icon: <FaShoppingCart  />, text: "Orders", to: "/dashboard?tab=orders", key: "orders" },
  { icon: <FaChartBar  />, text: "Analytics", to: "/dashboard?tab=analytics", key: "analytics" },
  { icon: <FaCog  />, text: "Settings", to: "/dashboard?tab=settings", key: "settings" },
];

 export const userLinks  = [
  
  { icon: <FaUserEdit />, text: "Account", to: "/dashboard?tab=profile", key: "profile" },
  { icon: <FaShoppingCart />, text: "Orders", to: "/dashboard?tab=orders", key: "orders" },
];