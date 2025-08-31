import { createContext, useState } from 'react'
import { useSelector } from 'react-redux'
import SidebarItems from './SidebarItems'
import { adminLinks, userLinks } from '../../data/SidebarRoles'

export const SidebarContext = createContext()

const Sidebar = () => {
 
  const user = useSelector((state) => state.user?.currentUser); 

  const [expanded, setexpanded] = useState(false)
  console.log(user?.isAdmin)

  //helper 
  const rederLinks = links => 
    links.map(({ icon, text, to, key }) => (
       <SidebarItems 
        key={key}
        icon={icon}
        text={text}
        to={to}
        active={window.location.href.includes(key)}
      />
    ))

    
  return (
   <aside className='min-h-screen py-2'>
    <nav className='flex flex-col h-full bg-white  shadow-sm'>
      <div className=" p-2 pb-2 flex justify-between items-center border-b">
        {/* expanded side bar */}
        <span className={`relative overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}>
          {user?.username}
        </span>
        <button onClick={()=> setexpanded(cur => !cur)} 
          className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'>
            {expanded ? <img src={user?.avatar} className='w-10 h-10 object-cover rounded-full'/> :
            <img src={user?.avatar} 
            alt={`${user?.username} thumbnail`}
            className='w-10 h-10 object-cover rounded-full'/>
            }

        </button>
      </div>
      {/* context things */}
      <SidebarContext.Provider value={{ expanded }} >
       <ul className='py-3'>
        {user?.isAdmin ? rederLinks(adminLinks) : rederLinks(userLinks)}
       </ul>
      </SidebarContext.Provider>
    </nav>
   </aside>
  )
}

export default Sidebar