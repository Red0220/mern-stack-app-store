import { TiDelete } from "react-icons/ti";
import { useState } from "react"; 






const ProductFiles = ({files, setFiles,  formData, setFormData}) => {

const [uploadError, setUploadError] = useState(null);
const [uploadSuccess, setUploadSuccess] = useState(null);



 const handleUpload = () => {
    const totalFiles = files.length + formData.images.length;

    if (totalFiles === 0) return;
    if (totalFiles > 6) {
      setUploadError("You can upload a maximum of 6 images.");
      return;
    }
      const imgs = files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        file,
      }));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imgs],
      }));
      setUploadSuccess("Images uploaded successfully");
      setFiles([]);
    
  };

  const handleDelete = (i) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, x) => x !== i),
    });
  };
  return (
      <>
       
       
        {/* image upload */}
        <div className={`p-6 rounded-2xl border border-gray-200 space-y-4 ${formData.images.length > 0 ? 'hidden' : '' }`}>
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
      { formData.images.length > 0 && (
      
        <ul className="flex flex-wrap gap-6 mt-4">
          {formData.images.map((img, i)=>(
    
            <li key={i} className="relative">
        
               <img 
                src={img.url}
                alt={img.name}
                className="h-32 w-32 lg:h-60 lg:w-60 object-cover rounded-md"
                />
               <button type="button" 
               onClick={()=> handleDelete(i)}
               className="absolute top-1 right-1 bg-white/80 p-0.5 rounded-full cursor-pointer hover:bg-red-100 transition">
                <TiDelete className="text-red-600 text-xl"/>
               </button>
            </li>
        
          ))}
          
        </ul>
     
    )}
  
      </>
 
    
  );
};

export default ProductFiles;









