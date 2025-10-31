import React from 'react'

const IsLoading = arg => {
    if(arg) 
        return (
    <div>
        <div className="text-gray-600">Loading...</div>
    </div>)
}

export default IsLoading