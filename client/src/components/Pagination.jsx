import React from 'react'
const BUTTON_STYLE = 'px-3 py-1 text-sm font-medium border border-gray-100 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
 
const Pagination = ({
    canGoBack= true,
    canGoNext= true,
    onBack,
    onNext,
    nextLabel= 'Next',
    backLabel= 'Back',
}) => {
  return (
     <div className="flex items-center gap-2 justify-between">
          <button 
          onClick={onBack}
          disabled={!canGoBack}
          className={BUTTON_STYLE}>
           {backLabel}
          </button>
          {/* <div className="px-3 py-1 border border-gray-100 bg-gray-50 text-sm">{page} / {totalPages}</div> */}
          <button 
          onClick={onNext}
          disabled={!canGoNext}
          className={BUTTON_STYLE}>
              {nextLabel}
          </button>
        </div>
  )
}

export default Pagination