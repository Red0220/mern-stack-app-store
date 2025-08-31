import React from "react";
import { useSelector } from "react-redux";

import Input from "../../components/Input";



const FormField = ({ label, children, dir='col' })=> 
 <label 
 className={`flex ${dir==='row' ? 'flex-row  items-center border border-gray-200 p-2 rounded-md ' : 'flex-col'} gap-3`}>
  <span 
  className={`text-sm font-medium text-slate-600 whitespace-nowrap ${dir === 'row' ? 'px-2 border-r border-inherit min-w-[60px]': ''}`}>{label} :</span>
  
      {children}
  

 </label>





const AddProduct = () => {

  const user = useSelector((state) => state.user?.currentUser);

  const baseInput =
  "p-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300 transition";

  console.log(user);




  return (
    <div className="w-full min-h-screen p-8  bg-white shadow-md">

      <h1 className="text-center text-2xl font-semibold text-slate-800 pb-8">
        Add a new product
      </h1>
      <form className="space-y-10 w-full max-w-3xl mx-auto">
        {/* general info */}
        <div className="p-6 rounded-2xl border border-gray-200 space-y-4">
          <h2 className="text-lg font-medium text-slate-800 pb-2 ">
            General information
          </h2>

          <FormField label={'Product Name'}>
             <input type="text"
               placeholder="Product Name"
              className={`${baseInput} p-1.5 w-[70%] m-1`} />
          
          </FormField>
          <FormField label={'Description'}>
             <textarea
                type="text"
                placeholder="description..."
                className={`${baseInput} p-3 w-[70%] m-1`} 
              />
         
          </FormField>
       
        </div>
        {/* details : price ect */}
        <div className="p-6 rounded-2xl border border-gray-200 space-y-4">
          <h1 className="text-lg font-medium text-slate-800 ">
           Price & Details
          </h1>
           <div className="flex flex-col md:flex-row gap-6">
              <FormField label={'Price'} dir="row">
              <input 
                type="number"
                placeholder="Price"
                min={0}
                className={`${baseInput}  `}
              />
          </FormField>
           <FormField label={'Discount (%)'} dir="row">
              <input 
              type='number'
              className={`${baseInput} w-[4rem]`}/>
           </FormField>
               {/* <FormField label={'Price'} dir="row">
              <input 
                type="number"
                placeholder="Price"
                min={0}
                className={`${baseInput}  `}
              />
          </FormField> */}

           </div>
        </div>
        {/* image upload */}
        <div className="p-6 rounded-2xl border border-gray-200 space-y-4">
          <h1 className="text-lg font-medium text-slate-800 pb-2 ">
            Add a new product
          </h1>
          <input type='number'  placeholder='discount'
          className={`${baseInput} `} />
        </div>
           
        {/* submit button */}
      </form>
    </div>
  );
};

export default AddProduct;









