import { useGetProductsQuery } from "../redux/Api/product.slice";
import { formatPrice } from "../util/formatPrice";
import { Link } from "react-router-dom";

import ImageGallery from "../components/ImageGallery";
import { useSelector } from "react-redux";
import IsLoading from "../components/ui/IsLoading";

const LandingPage = () => {
const user = useSelector((state) => state.user?.currentUser);
const { data, isLoading} = useGetProductsQuery();
const product = data?.products[0] ?? null;

const featured = data?.products ? [...data.products] : []


if(isLoading) return <IsLoading/>
  return (
    <div className="w-full">
      {/* HERO */}
      {product && (
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 px-6 py-15 gap-10">
          <div className="flex justify-center">
         <ImageGallery
         images={product?.images} 
         title={product?.title}
         />
        </div>
         
         
          <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug max-w-md">
            {product?.title}
          </h1>
          {/* <p className="mt-4 text-gray-600 text-lg">
            Hand-picked quality items delivered fast and securely.
          </p> */}
        {/* product detais */}
        <div className="w-full flex items-start gap-x-10 py-10  space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">
          Price:
          </span> 
          {formatPrice(product.price)}
          
          </p>
          <p><span>
            In Stock</span> {product.stock}</p>
        </div>

         <div className="flex flex-col sm:flex-row gap-4 w-full justify-between items-center py-6">
           <Link
            to={user?._id ?`/cart/${user?._id}` : '/signin'}
            className="w-full sm:w-auto text-center bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition hover:opacity-90"
          >
            Place an order
          </Link>
          <button 
         className="w-full sm:w-auto text-center bg-yellow-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-yellow-700 transition"
          >Add to cart</button>
         </div>

        </div>

       
      </section>
    
    )
  }
  
      {/* FEATURED PRODUCTS*/}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <Link
                key={product._id}
                to={`/product-details/${product._id}`}
                className="border rounded-lg p-4 hover:shadow-lg transition"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="mt-3 text-sm font-medium line-clamp-1">
                  {product.title}
                </h3>
                <p className="mt-1 text-gray-700 font-semibold">
                  {formatPrice(product.price)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section> 


      {/* ADVANTAGES */}
      <section className="bg-gray-100 py-16 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>🚚 <p className="font-semibold">Fast Shipping</p></div>
          <div>🔒 <p className="font-semibold">Secure Checkout</p></div>
          <div>💬 <p className="font-semibold">24/7 Support</p></div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
