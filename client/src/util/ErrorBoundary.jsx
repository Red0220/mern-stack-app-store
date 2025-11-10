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
    handleReload = () => {
        this.setState({hasError: false, error : null })
        window.location.reload();
    }
    render(){
        if(this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 ">
                    <h2 className="text-2xl font-semibold mb-2">
                        Something went wrong.
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-md">
                        {this.state.error?.message || "Unxpected error occured. Please try again later."}
                    </p>
                    <button onClick={this.handleReload}
                    className=" mt-4 px-4 py-2 bg-gray-600 text-white rounded transition-colors hover:opacity-50 cursor-pointer">
                        Try again
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary