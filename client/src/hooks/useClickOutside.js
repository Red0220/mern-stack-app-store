import { useEffect } from "react"

export const useClickOutside = (ref, callback) => {
    useEffect(()=> {
        const handleClickOutside = (e)=> {
            if(ref.current && !ref.current.contains(e.target)){
                callback(e)
            }
        }
        const handleEscape =(e)=> {
            if(e.key === 'Escape'){
                callback(e)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)

        return ()=> {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [ref, callback])
}