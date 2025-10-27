
const FormField = ({ label, children, dir='col' })=> 
 <label 
 className={`flex ${dir==='row' ? 'flex-row  items-center border border-gray-200 p-2 rounded-md ' : 'flex-col'} gap-3`}>
  <span 
  className={`text-sm font-medium text-slate-600 whitespace-nowrap ${dir === 'row' ? 'px-2 border-r border-inherit min-w-[60px]': ''}`}>{label} :</span>
      {children}
 </label>
 
 export default FormField;