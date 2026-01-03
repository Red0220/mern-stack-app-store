import { FaTrash} from 'react-icons/fa'
import { formatPrice } from '../../../util/formatPrice';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity} from '../../../redux/cart/cart.slice.js'


const CartItemRow = ({ item, k }) => {
 
  const dispatch = useDispatch();

  const handleIncrement = () => {
    
    dispatch(incrementQuantity(item.id));
  }
  const handleDecrement = () => {
    dispatch(decrementQuantity(item.id));
  }

  const price = item.price * item.quantity;
  return (
   
     <tr className="border-b border-gray-500  " key={k}>
      <td>
        <div className="inline-flex items-center gap-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 rounded-md object-cover"
          />

          <p className="px-2 text-sm font-medium line-clamp-2">
            {item.title}
          </p>

          <div className=" flex items-center border border-gray-400 rounded-md">
            <button disabled={item.quantity <= 1}
            className="border-r border-gray-300 px-2 " 
            onClick={handleDecrement}
            >
              -
            </button>
            <input
              type="number"
              value={item.quantity}
              
              className="w-12 text-center"
            />
            <button 
            disabled={item.quantity >= item.stock}
            className=" border-l border-gray-300 px-2 focus:outline-none"
            onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
      </td>
         
     <td className='py-6 text-right align-middle '>
       <div className="inline-flex items-center  gap-5 hover:bg-gray-50 rounded px-2 py-1 ">
        <button >
          <FaTrash className="text-red-600 hover:text-red-800"/>
        </button>

       <span className="font-semibold "> {formatPrice(price)}</span>
      
      
      </div>
     </td>
    </tr>
   
  );
};

export default CartItemRow;

