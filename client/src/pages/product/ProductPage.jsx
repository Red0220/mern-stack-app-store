
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetProductByIdQuery } from "../../redux/Api/product.slice.js";
import { addToCart } from "../../redux/cart/cart.slice";
import IsLoading from "../../components/ui/IsLoading";
import Ratings from "../../components/ui/Ratings";
import ImageGallery from "../../components/ImageGallery";
import ShowMore from "../../components/ui/ShowMore";
import { formatPrice } from "../../util/formatPrice.js";

import { MdAddShoppingCart } from "react-icons/md";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch()

  

  const { data, isLoading, error } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) return <IsLoading />;
  if (error) return <div className="p-4 text-red-500">{error?.data?.message}</div>;

  
  const product = data ?? null;
  console.log(product)
  const [quantity, setQuantity] = useState(1);

 
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        title: product.title,
        price: product.price,
        quantity,
        image: product.images?.[0],
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* LEFT SIDE - IMAGES */}
        <ImageGallery images={product.images} title={product.title} />

        {/* RIGHT SIDE - PRODUCT INFO */}
        <div className="flex flex-col gap-6">

          <h1 className="text-2xl font-semibold text-gray-900 leading-snug">
            {product.title}
          </h1>

          {/* RATINGS */}
          <div className="flex items-center gap-3">
            <Ratings rating={product.ratings || 3} onRate={() => {}} />
            <p className="text-sm text-gray-700 font-medium">
              ({(product.ratings || 0).toFixed(1)})
            </p>
          </div>

          <div className="flex items-center justify-between max-w-md">

  {/* LEFT: Price */}
  <div className="flex items-baseline gap-2">
    <span className="text-gray-700 text-lg">Price:</span>
    <span className="text-2xl font-semibold text-gray-900">
      {formatPrice(product.price)}
    </span>
  </div>

  {/* RIGHT: Stock badge */}
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${
      product.stock > 0
        ? "text-green-800 bg-green-100"
        : "text-red-800 bg-red-100"
    }`}
  >
    {product.stock > 0 ? "In Stock" : "Out of Stock"}
  </span>

</div>


          {/* QUANTITY + ADD TO CART */}
          <div className="flex items-center gap-4 mt-4">
            {/* Quantity selector */}
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2"
            >
              {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1)
                .map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
            </select>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="flex items-center justify-center gap-2 flex-1 
                         py-2 px-4 rounded-md bg-black text-white font-medium 
                         hover:opacity-80 active:scale-[0.97] transition-all"
            >
              <MdAddShoppingCart className="text-2xl" />
              Add to Cart
            </button>
          </div>

          {/* LITTLE BADGES */}
          <div className="flex gap-4 text-gray-500 text-xs mt-2">
            <span className="flex items-center gap-1">✔️ Fast shipping</span>
            <span className="flex items-center gap-1">✔️ Secure checkout</span>
          </div>

        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-10 border-t border-t-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          About this item:
        </h2>
        <ShowMore text={product.description} />
      </div>
    </div>
  );
};

export default ProductPage;

