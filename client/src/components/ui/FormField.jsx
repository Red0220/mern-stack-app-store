
const FormField = ({ label, children, dir='col' })=>{
    return (
        <div className="space-y-1">
            <div className={`flex gap-3 ${
                dir === 'row' ? 'flex-row items-center' : 'flex-col'}`}>
                {label && (
                    <label 
                    className="text-sm font-medium text-slate-600">
                        {label}
                    </label>
                )}
                <div className="flex-1">
                    {children}
                </div>
            </div>

        </div>
    )
}
 
 export default FormField;