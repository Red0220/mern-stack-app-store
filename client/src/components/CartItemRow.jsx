const CartItemRow = ({ item }) => {
  return (
    <tr className="border-b">
      <td className="py-4 px-4">
        <div className="flex items-center gap-6">
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 rounded-md object-cover"
          />

          <p className="text-sm font-medium max-w-xs truncate">
            {item.title}
          </p>

          <div className="flex items-center gap-2">
            <button className="px-2 border">-</button>
            <input
              type="number"
              value={item.quantity}
              
              className="w-14 text-center border rounded"
            />
            <button className="px-2 border">+</button>
          </div>
        </div>
      </td>

      <td className="py-4 text-right font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItemRow;

