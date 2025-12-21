import { FaTrash} from 'react-icons/fa'
const CartItemRow = ({ item, k }) => {
  return (
   
     <tr className="border-b" key={k}>
      <td className="py-4 px-4">
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

      <td className="py-8 px-4 flex items-center gap-4">
        <button >
          <FaTrash className="text-red-600 hover:text-red-800"/>
        </button>

       <div className="font-semibold "> ${(item.price * item.quantity).toFixed(2)}</div>
      
      
      </td>
    </tr>
   
  );
};

export default CartItemRow;

