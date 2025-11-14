
import { useMemo, useState, useCallback, useEffect  } from 'react';
import { useGetProductsQuery } from '../../redux/Api/product.slice.js';
import { Link } from 'react-router-dom'

import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import { MdDelete, MdEdit } from 'react-icons/md';

import DeleteButton from '../../components/DeleteProduct.jsx';

import IsLoading from '../../components/ui/IsLoading.jsx';
import { formatPrice} from "../../util/formatPrice.js"

const PAGE_SIZE = 10;
 //STYLES **
const BUTTON_STYLE = 'px-3 py-1 border border-gray-100 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
const BTN_STYLE = 'flex gap-2 items-center w-full text-left px-3 py-2 hover:bg-gray-50 text-sm'


 const Products = () => {

  const { data, error, isLoading, refetch } = useGetProductsQuery()
  const products = data?.products || []

  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('')
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [action, setAction] = useState(null)
  
  //debounce search input 
   useEffect(()=> {
    const handler = setTimeout(() => {
      setDebounceQuery(query)
      setPage(1)
    }, 300);
    return ()=> clearTimeout(handler)
   }, [query])
   // close menu on outside click or Esc
  useEffect(()=> {
    const handleClickOutSide = e => {
      if(action && !e.target.closest('.action-menu')){
        setAction(null)
      }
    }
    document.addEventListener('click', handleClickOutSide)
    return ()=> document.removeEventListener('click', handleClickOutSide)
  },[action])

  const filtered = useMemo(()=> {

    let q = debounceQuery.toLowerCase();
    let list = [...products];
    
    const compare = (item, key)=> {
      if(key === 'price' || key === 'stock') return Number(item[key] ||0);
      if( key === 'createdAt') return new Date(item.createdAt || 0).getTime()
        return String(item.title || '').toLocaleLowerCase()
    }

    if(q){
      list= list.filter(p => {
        const title = String(p.title || "").toLowerCase();
        const desc = String(p.description || "").toLowerCase();
        const id = String(p._id).toLowerCase();
        return title.includes(q) || desc.includes(q) || id.includes(q);
      })
    }

    list.sort((a,b) => {
          const aVal = compare(a, sortBy);
          const bVal = compare(b, sortBy)
          if(aVal < bVal) return sortOrder === "asc" ? -1 : 1;
          if(aVal > bVal) return sortOrder === "asc" ? 1 : -1;
          return 0;
    })
    return list;
  },[products, debounceQuery, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const pageItems = useMemo(()=> {
    const startIndex = (page - 1) * PAGE_SIZE
    return filtered.slice(startIndex, startIndex + PAGE_SIZE)
  }, [filtered, page])

  const handleToggleMenu = useCallback(id => {
    setAction(prev => (prev === id ? null : id))
  },[])

  const handleSort = (f) => {
    if(f === sortBy){
      setSortOrder(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(f)
      setSortOrder('asc')
    }
    setPage(1)
  }

   if (isLoading) return <IsLoading arg={isLoading} />;

  if (error) {
    return (
      <div className="text-center font-semibold text-2xl text-red-600">
        {error?.data?.message || 'Error loading products.'}
      </div>
    );
  }

   if (!products.length) {
    return (
      <div className="text-center font-bold text-2xl text-gray-700">
        No products found.
      </div>
    );
  }
  
  
// log
console.log('page items', pageItems)
  return (
    <div className='p-3 sm:p-4 lg:p-6'>
      <h1 className="text-3xl font-semibold mb-4 text-center text-slate-800">Products Management</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 bg-white border rounded-md px-3 py-1 shadow-sm max-w-mid w-full sm:w-auto">
          <FiSearch className='text-gray-500' />

          <input 
          aria-label='Search products'
          placeholder='search...'
          value={query}
          onChange={(e)=> {setQuery(e.target.value); setPage(1); }}
          className='w-full bg-transparent outline-none text-sm px-2'
          />
        </div>
        <div className="flex items-center gap-2">
          <label className='text-sm text-gray-600'>Filter: </label>
          <select 
          value={sortBy}
          onChange={(e)=> setSortBy(e.target.value)}
          className='border rounded px-2 py-1 text-sm'
          aria-label='Sort products'
          >
            <option value='createdAt'>Created At</option>
            <option value='title'>Title</option>
            <option value='price'>Price</option>
            <option value='stock'>Stock</option>
          </select>

          <button type='button'
          onClick={()=> setSortOrder(d => (d === 'asc' ? 'desc' : 'asc'))}
          className='border rounded px-1 py-1 text-sm'
          aria-label='Toggle sort order'>
            { sortOrder === "asc" ? "Asc" : "Desc"}
          </button>
        </div>
      </div>

      <div className=" sm:block  bg-white border border-gray-400 rounded-md shadow-sm">
         <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {
                ["Product", "Offer", "Price", "Stock", "Rating", "Actions"].map((th, i) =>(
                  
                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" key={i}>{th}</th>
                ))
              }
          </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {pageItems.map(p => (
              
              <tr key={p._id} className='hover:bg-gray-50 transition-colors'>
                <td className='px-4 py-3'>
                <Link to={`/product-details/${p._id}`}  className=''>
                  <div className="flex items-center gap-3">
                    <img 
                    src={p.images[0]}
                    alt={p.title || 'product images'}
                    loading='lazy'
                    width={48}
                    height={48}
                    onError={e => {e.currentTarget.src = 'https://via.placeholder.com/48?text=?';}}
                    className='w-12 h-12 object-cover rounded'
                    />
                     <div className="min-w-0 line-clamp-1">
                      <div className="font-medium text-sm">
                        {p.title ||"Untitled product"}
                      </div>
                      <div className="text-xs text-gray-500 ">
                        {p.description ||''}
                      </div>
                     </div>
                  </div>
                    </Link>
                </td>
                <td className='px-4 py-3'>
                  {
                    p.offer ? (
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-sm">
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-700 px-2 py-0.5 rounded text-sm">
                        No
                      </span>
                    )
                  }
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{p.stock ?? 0}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{p.rating ?? '_' }</td>
                   {/* action part */}
                <td className="px-4 py-3 relative">
                   <div className="action-menu">
                  <button 
                  aria-expanded={action === p._id}
                  aria-controls={`action-menu-${p._id}`}
                  className='text-gray-600 hover:text-gray-800 cursor-pointer'
                  onClick={()=> handleToggleMenu(p._id)}
                  >
                   <HiOutlineDotsHorizontal size={20} />
                  </button>
                   </div>
                  {
                    action == p._id && (
                      <div className="absolute top-8 right-0 mt-2 w-36 font-semibold text-sm bg-white border border-gray-200 rounded shadow-sm z-[9999] "
                      id={`action-menu-${p._id}`}
                      role='menu'
                      aria-label='Product actions'
                      >
                        <button role='actionitem' className={BTN_STYLE}>
                          <MdEdit size={20} color='gray'/>
                          <span>Update</span>
                          </button>
                          
                          <DeleteButton id={p._id} onSuccess={refetch} entityName='product' />
                      </div>
                    )
                  }
                </td>
              </tr>
              
            ))}
          </tbody>
          </table>
      </div>

      {/* pagination */}
      <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
        </div>

        <div className="flex items-center gap-2">
          <button 
          onClick={()=> setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className={BUTTON_STYLE}>
            prev
          </button>
          <div className="px-3 py-1 border border-gray-100 bg-gray-50 text-sm">{page} / {totalPages}</div>
          <button 
          onClick={()=> setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={BUTTON_STYLE}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Products
