import { useState } from "react";
import { toast } from "react-toastify";

import { useDeleteProductMutation } from "../redux/Api/product.slice";
import { useDeleteUserMutation } from '../redux/Api/auth.slice.js'
import { MdDelete } from "react-icons/md";

const DeleteButton = ({ id, onSuccess, entityName = "item" }) => {
    const [deleteProduct, productState] = useDeleteProductMutation();
    const [deleteUser, userState] = useDeleteUserMutation();

    const [showModal, setShowModal] = useState(false)

    console.log(showModal, "show")

    const isUser = entityName === 'user'
    const deleteEntity = isUser ? deleteUser : deleteProduct;
    const isLoading = isUser ? userState.isLoading : productState.isLoading;

    const name = entityName ?? (isUser ? 'user' : 'product')

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await deleteEntity(id).unwrap();
            const message = res?.message || `${name} deleted successfully`;
            if (res?.success) {
                toast.success(message);
                if (onSuccess) onSuccess(id);
            } else {
                toast.error(res?.message || `Failed to delete ${name}`);
            }
        } catch (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    };
    return (
        <div>
            <button
                role="button"
                aria-label={`Delete ${entityName}`}
                className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition-colors ${isLoading
                        ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-500"
                        : "text-red-700 hover:bg-red-50"
                    }`}
                onClick={()=> setShowModal(true)}
                disabled={isLoading}
            >
                <MdDelete size={20} />
                {isLoading ? "Deleting..." : "Delete"}
            </button>

            {
                showModal && (
                    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center">

                        <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-sm animate">
                            <h2 className="text-lg fon-semibold text-gray-800 mb-2">
                                Confirm Deletion
                            </h2>
                            <p className="text-sm text-gray-600 mb-5">
                                Are you sure you want to delete this
                                <span className="font-medium">
                                    {name}
                                </span>?
                                this action cannot be undone
                            </p>
                            <div className="flex justify-end gap-3">
                                <button type="button"
                                    className='px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transform-colors'
                                    onClick={()=> setShowModal(false)}>
                                    Cancel
                                </button>
                                <button
                                    role="button"
                                    aria-label={`Delete ${entityName}`}
                                    aria-modal='true'
                                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition-colors ${isLoading
                                            ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-500"
                                            : "text-red-700 hover:bg-red-50"
                                        }`}
                                    onClick={handleDelete}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Deleting..." : "Confirm"}
                                </button>


                            </div>
                        </div>
                    </div>
                )
            }

        </div>

    );
};

export default DeleteButton;
