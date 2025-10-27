import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';

import Steps from "../../components/ui/Steps";
import ProductDetail from "./ProductDetail";
import ProductFiles from "./ProductFiles";

import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import {useCreateProductMutation } from '../../redux/Api/product.slice'



  const BASE_INPUT_CLASS =
    "p-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300 transition";
  const NAVIGATION_CLASS =
    "w-24 text-sm py-2 rounded-md bg-gray-100 hover:bg-gray-300 font-medium transition-all cursor-pointer";




const AddProduct = () => {

  const user = useSelector((state) => state.user?.currentUser);
  const navigate = useNavigate();
  const [createProduct, { isLoading}] = useCreateProductMutation();

  //state management*
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    discount: 0,
    stock: 0,
    offer: false,
    images: [],
  });
  const [files, setFiles] = useState([]);

  //functions
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

 

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 2));
  };
  const handlePrev = () => {
    setStep((p) => Math.max(p - 1, 1));
  };
  // submit handler to be added
  const handleSubmit = async (e) => {
    e.preventDefault();
     if(formData.images.length < 2) return toast.error("Please upload at least 2 images for the product.", {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
      
     });
    // prepare payload with numeric fields coerced to numbers
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('description', formData.description);
      fd.append('price', formData.price);
      fd.append('discountPrice', formData.discount);
      fd.append('stock', formData.stock);
      fd.append('offer',formData.offer);
      formData.images.forEach((img) => {
        fd.append('images', img.file);
      });
    try {
      const data = await createProduct(fd).unwrap();
       if(data.success) {
        toast.success("Product created successfully!")
        navigate('/')
        setFormData({
                title: "",
                description: "",
                price: 0,
                discount: 0,
                stock: 0,
                offer: false,
                images: [],
                    });
        setFiles([]);
       }
    } catch (error) {
      console.error("Error creating product:", error);
       toast.error( error?.data?.message||'Failed to create product. Please try again.')
    }
     
  }
  return (
    <div className="w-full min-h-screen p-8  bg-white shadow-md">
      <h1 className="text-center text-2xl font-semibold text-slate-800 pb-8">
        Add a new product
      </h1>

      <Steps
        steps={["Product Details", "Upload Files"]}
        active={step}
        onStepChange={setStep}
      />

      <form 
      className="space-y-10 w-full max-w-3xl lg:max-w-6xl mx-auto"
       onSubmit={handleSubmit}>
        {/* general info */}
        {step === 1 ? (
          <ProductDetail
            formData={formData}
            handleChange={handleChange}
            baseInput={BASE_INPUT_CLASS}
          />
        ) : (
          <ProductFiles
            formData={formData}
            setFormData={setFormData}
            files={files}
            setFiles={setFiles}
          />
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className={NAVIGATION_CLASS}
            >
              <MdOutlineNavigateBefore className="inline-block mr-1 text-lg" />
              back
            </button>
          ) : (
            <div></div>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              className={NAVIGATION_CLASS}
            >
              next
              <MdOutlineNavigateNext className="inline-block ml-1 text-lg" />
            </button>
          ) : (
            <div></div>
          )}
        </div>

        {/* Submit */}
        {step === 2 && (
          <button disabled={isLoading}
          type="submit"
          className="w-full lt-6 py-3 border border-black text-slate-800 font-semibold rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
        >
          {isLoading && (
            <span className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin "></span>
          )}
          {isLoading ? " Creating Product..." : "Add Product"}
        </button>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
