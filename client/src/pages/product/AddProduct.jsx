import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";





const FormField = ({ label, children, dir='col' })=> 
 <label 
 className={`flex ${dir==='row' ? 'flex-row  items-center border border-gray-200 p-2 rounded-md ' : 'flex-col'} gap-3`}>
  <span 
  className={`text-sm font-medium text-slate-600 whitespace-nowrap ${dir === 'row' ? 'px-2 border-r border-inherit min-w-[60px]': ''}`}>{label} :</span>
      {children}
 </label>


const discountCalculator = (price, discount) => {
  if (!discount) return price;
  return price - (price * discount) / 100;
}

console.log(discountCalculator(98, 20)); // 80


const AddProduct = () => {

  const user = useSelector((state) => state.user?.currentUser);

  //state management
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    discount: 0,
    stock: 0,
    images: [],
  })
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [error, setError] = useState(null);
  

  const navigate = useNavigate();
  const fileInputRef = useRef();


  const baseInput =
  "p-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300 transition";

  console.log(user);
  console.log(files);
  console.log(formData);
  console.log(uploadError);

  //functions
  const handleChange = e => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }


  const handleUpload = ()=> {
    const totalFiles = files.length + formData.images.length;

    if(totalFiles === 0) return;
    if(totalFiles < 7) {
    
      const imgs = files.map(file =>({
        name: file.name,
        url: URL.createObjectURL(file),
        file
      }))
      
      setFormData((prev)=>({
        ...prev,
        images: [...prev.images, ...imgs]
      }))
      setFiles([]);

    } else {
      setError('You can upload maximum 6 images');
    }
  }

    


  return (
    <div className="w-full min-h-screen p-8  bg-white shadow-md">

      <h1 className="text-center text-2xl font-semibold text-slate-800 pb-8">
        Add a new product
      </h1>
      <form className="space-y-10 w-full max-w-3xl lg:max-w-6xl mx-auto">
        {/* general info */}
        <div className="p-6 rounded-2xl border border-gray-200 space-y-4">
          <h2 className="text-lg font-medium text-slate-800 pb-2 ">
            General information
          </h2>

          <FormField label={'Product Name'}>
             <input type="text"
              id="title"
              placeholder="Product Name"
              className={`${baseInput} p-1.5 w-[70%] m-1`}
              onChange={handleChange} />
          
          </FormField>
          <FormField label={'Description'}>
             <textarea
                type="text"
                id="description"
                placeholder="description..."
                className={`${baseInput} p-3 w-[70%] m-1`} 
                rows={3}
                onChange={handleChange}
              />
         
          </FormField>
       
        </div>
        {/* details : price ect */}
        <div className="p-6 rounded-2xl border border-gray-200 space-y-4">
          <h1 className="text-lg font-medium text-slate-800 ">
           Price & Details
          </h1>
           <div className="flex flex-col flex-wrap md:flex-row gap-6 text-xs">
              <FormField label={'Price'} dir="row">
              <input 
                type="number"
                id="price"
                placeholder="Price"
                min={0}
                className={`${baseInput}`}
                onChange={handleChange}
              />
          </FormField>
           <FormField label={'Discount (%)'} dir="row">
              <input 
              type='number'
              id="discount"
              className={`${baseInput} w-[3rem]`}
              onChange={handleChange}/>
           </FormField>
               <FormField label={'Total'} dir="row">
              <input 
                type="number"
                placeholder="Price"
                readOnly
                className={`${baseInput} `}
              />
          </FormField>
            <FormField label={'Stock'} dir="row">
              <input 
                type="number"
                id="stock"
                placeholder="Stock"
                min={0}
                className={`${baseInput} w-[4rem]`}
                onChange={handleChange}
              />
            </FormField>

           </div>
        </div>
        {/* image upload */}
        <div className={` p-6 rounded-2xl border border-gray-200 space-y-4 ${formData.images.length > 0 ? 'hidden' : '' }`}>
          <h1 className="text-lg font-medium text-slate-800 pb-2 ">
           Product images
          </h1>
         <label
        htmlFor="image"
        className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input type='file' id="image"  accept='image/*' multiple 
        onChange={(e)=>setFiles(Array.from(e.target.files))}
     hidden />
      </label>
      { files && files.length > 0 && <button type="button"
       className="p-2 font-medium w-full border border-gray-300 rounded-md cursor-pointer text-slate-800"
      onClick={handleUpload} >
        Upload
        </button>}
        </div>
           
        {/* submit button */}
      </form>
      { formData.images.length > 0 && (
        <div className="w-full max-w-3xl lg:max-w-6xl mx-auto mt-6 p-4 border border-gray-200 rounded-2xl">
          <h2 className="text-lg font-medium text-slate-800 pb-4 ">
            Uploaded images ({formData.images.length} of 6)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">      
            {formData.images.map((img, i) => (
              <div key={i} className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                <img  src={img.url} alt={img.name} className="w-full h-full object-cover" />
                <button 
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                onClick={()=> setFormData((prev)=>({
                  ...prev,
                  images: prev.images.filter((_, index) => index !== i)
                }))}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>


      )
    }
    </div>
    
  );
};

export default AddProduct;









