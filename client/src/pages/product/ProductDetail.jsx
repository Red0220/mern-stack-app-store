import { set } from "mongoose";
import FormField from "../../components/ui/FormField";




const discountCalculator = (price, discount) => {
  if (!discount) return price;
  return price - (price * discount) / 100;
}

console.log(discountCalculator(98, 20)); // 80


const ProductDetail = ({formData,setFormData, handleChange, baseInput}) => {

  return (
      <>
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
              value={formData.title}
              onChange={handleChange} />
          
          </FormField>
          <FormField label={'Description'}>
             <textarea
                type="text"
                id="description"
                placeholder="description..."
                className={`${baseInput} p-3 w-[70%] m-1`} 
                rows={3}
                value={formData.description}
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
                value={formData.price}
                onChange={handleChange}
              />
          </FormField>
          {/* offer */}
              <FormField label={'Offer'} dir="row">
              <input 
                type="checkbox"
                id="offer"
                className={`${baseInput}`}
                checked={formData.offer}
                onChange={(e)=> setFormData({...formData, offer: e.target.checked})}
              />
          </FormField>
           { formData.offer &&(
            <FormField label={'Discount (%)'} dir="row">
              <input 
              type='number'
              id="discount"
              className={`${baseInput} w-[3rem]`}
              value={formData.discount}
              onChange={handleChange}/>
           </FormField>
           )}
               <FormField label={'Total'} dir="row">
              <input 
                type="number"
                placeholder="Price"
                readOnly
                value={discountCalculator(formData.price, formData.discount)}
                className={`${baseInput} `}
              />
          </FormField>
            <FormField label={'Stock'} dir="row">
              <input 
                type="number"
                id="stock"
                placeholder="Stock"
                min={0}
                value={formData.stock}
                className={`${baseInput} w-[4rem]`}
                onChange={handleChange}
              />
            </FormField>

           </div>
        </div>
      
      </>
    
  
    
  );
};

export default ProductDetail;









