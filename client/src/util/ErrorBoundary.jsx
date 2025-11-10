import * as React from 'react'

class ErrorBoundary extends React.Component{
    constructor(props){
      super(props);
      this.state = { hasError: false};  
    }
    static getDerivedStateFromError(error){
        return { hasError: true };
    }
    componentDidCatch(err, errInfo){
        console.error('Error caught by Error Boundary:', err, errInfo)
    }
    
    render(){
        if(this.state.hasError) {
            return (
                <div className="text-center py-10 text-red-600">
                    <h2 className="text-2xl font-semibold mb-2">
                        Something went wrong.
                    </h2>
                    <p className="text-gray-600">
                        {this.state.error?.message}
                    </p>
                    <button className="mt-4 px-2 py-2 bg-gray-800 text-white rounded">
                        Try again
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary