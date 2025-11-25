import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetProductByIdQuery } from "../../redux/Api/product.slice.js";
import { addToCart, setTotalQuantity } from "../../redux/cart/cart.slice.js";
import IsLoading from "../../components/ui/IsLoading";
import { formatPrice } from "../../util/formatPrice.js";
import Ratings from "../../components/ui/Ratings";
import ImageGallery from "../../components/ImageGallery";
import ShowMore from "../../components/ui/ShowMore";

//icons
import { MdAddShoppingCart } from "react-icons/md";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [errMsg, setErrMsg] = useState("");

  const product = data?.product;
  const inStock = product?.stock > 0;
  const images = useMemo(() => product?.images, [product]);

  const desc = product?.description;

  console.log(desc);

  useEffect(() => {
    if (!error) return;
    const msg = "Something went wrong. Please try again later.";
    setErrMsg(msg);

    navigate("/", {
      state: {
        error: msg,
      },
      replace: true,
    });
  }, [error, navigate]);

  const handleAddTocart = useCallback( () => {
    dispatch(
      addToCart({
        ...product,
        _id: product._id,
        quantity,
      })
    );
  }, [dispatch, product, quantity]);
  console.log("product:", quantity);

  if (isLoading) return <IsLoading />;
  if (error) return <div className="p-4 text-red-500">{errMsg}</div>;

  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      {/* TOP SECTION: IMAGE + DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: Product Images */}
        <div className="">
          <ImageGallery images={images} title={product.title} />
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div className="flex flex-col gap-6">
          {/* TITLE */}
          <h1 className="text-2xl font-semibold text-gray-900 leading-snug">
            {product.title}
          </h1>

          {/* RATINGS */}
          <div className="flex items-center gap-3">
            <Ratings rating={product.ratings || 3} onRate={() => {}} />
            <p className="text-sm text-gray-900 font-medium">
              ({product.ratings?.toFixed(1) || "0.0"})
            </p>
          </div>

          {/* PRICE + STOCK */}
          <div className="flex items-center justify-between max-w-sm">
            <p className="text-xl font-semibold text-gray-900">
              {formatPrice(product.price)}
            </p>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold 
          ${
            product.stock > 0
              ? "text-green-800 bg-green-100"
              : "text-red-800 bg-red-100"
          }
        `}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* QUANTITY + ADD TO CART */}
          <div className="flex justify-between  items-center gap-4 mt-4">
            {/* Quantity dropdown */}
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-400 rounded px-3 py-2"
            >
              {Array.from({ length: product.stock }, (_, i) => i + 1)
              .map((num) => <option key={num} value={num}> {num}</option>)}
            </select>

            {/* Add to cart button */}
            <button
              type="button"
              onClick={handleAddTocart}
              className="flex items-center justify-center gap-2 
                          max-w-[50%] flex-1 py-2 px-4 rounded-md 
                          bg-black text-white font-semibold 
                          hover:opacity-80 active:scale-[0.97] 
                          transition-all shadow-sm"
                          aria-disabled={product.stock <= 0}
                          disabled={product.stock <= 0}
            >
              <MdAddShoppingCart className="text-2xl" />

              <span className="hidden sm:inline">Add to cart</span>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-end justify-end gap-1 sm:gap-4 text-gray-500 text-xs mt-2">
            <span className="flex items-center gap-1">
              ✔️ <span>Fast shipping</span>
            </span>

            <span className="flex items-center gap-1">
              ✔️ <span>Secure checkout</span>
            </span>
          </div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
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
