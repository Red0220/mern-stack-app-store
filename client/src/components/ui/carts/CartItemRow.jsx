import { FaTrash} from 'react-icons/fa'
import { formatPrice } from '../../../util/formatPrice';
const CartItemRow = ({ item, k }) => {
  const price = item.price * item.quantity;
  return (
   
     <tr className="border-b  flex items-center gap-4" key={k}>
      <td className="">
        <div className="flex items-center gap-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 rounded-md object-cover"
          />

          <p className="text-sm font-medium line-clamp-2">
            {item.title}
          </p>

          <div className=" flex items-center border border-gray-400 rounded-md">
            <button className="border-r border-gray-300 px-2 ">-</button>
            <input
              type="number"
              value={item.quantity}
              
              className="w-6 text-center"
            />
            <button className=" border-l border-gray-300 px-2 focus:outline-none">+</button>
          </div>
        </div>
      </td>
         
      <td className="flex items-center justify-between gap-3 hover:bg-gray-50 rounded px-2 py-1 min-w-[100px]">
        <button >
          <FaTrash className="text-red-600 hover:text-red-800"/>
        </button>

       <span className="font-semibold"> {formatPrice(price)}</span>
      
      
      </td>
    </tr>
   
  );
};

export default CartItemRow;

