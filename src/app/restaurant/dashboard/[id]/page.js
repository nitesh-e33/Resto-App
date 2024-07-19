'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RestaurantHeader from "../../../_components/RestaurantHeader";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../lib/constant";

const EditFoodItems=(props)=>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        handleLoadFoodItem();
    }, []);

    const handleLoadFoodItem = async() => {
        let response = await fetch(`${API_BASE_URL}/restaurant/foods/edit/` + props.params.id);
        response = await response.json();
        if(response.success) {
            setName(response.result.name);
            setPrice(response.result.price);
            setPath(response.result.img_path);
            setDescription(response.result.description);
        } else {
            toast.error("Data Not FOund");
        }
    }

    const handleEditFoodItem=async()=>{
        // console.log(name,path,price,description);
        if(!name || !path || !price || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
        }
        let response = await fetch(`${API_BASE_URL}/restaurant/foods/edit/` + props.params.id,{
            method:"PUT",
            body:JSON.stringify({name, price, img_path:path, description})
        });
        response = await response.json();
        if(response.success) {
            toast.success("Food Item Updated successfully!");
            router.push("../dashboard");
        } else {
            toast.error("Data is not updated. Please try again!!");
        }
    }

    return (
        <div className="container mx-auto p-4">
            <RestaurantHeader />
            <h1 className="text-2xl font-bold mb-4">Update Food Item</h1>
            <div className="mb-4">
            <input
                type="text"
                className="p-1 border border-gray-300 rounded"
                placeholder="Enter food name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className="input-error">Please enter a valid name</span>}
            </div>
            <div className="mb-4">
            <input
                type="text"
                className="p-1 border border-gray-300 rounded"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="input-error">Please enter a valid price</span>}
            </div>
            <div className="mb-4">
            <input
                type="text"
                className="p-1 border border-gray-300 rounded"
                placeholder="Enter path name"
                value={path}
                onChange={(e) => setPath(e.target.value)}
            />
            {error && !path && <span className="input-error">Please enter a valid path</span>}
            </div>
            <div className="mb-4">
            <input
                type="text"
                className="p-1 border border-gray-300 rounded"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {error && !description && <span className="input-error">Please enter a valid description</span>}
            </div>
            <div>
            <button
                className="bg-blue-500 text-white w-56 p-1 rounded hover:bg-blue-600"
                onClick={handleEditFoodItem}
            >
                Update Food Item
            </button>
            </div>
            <Link className="text-blue-500 hover:underline" href="../dashboard">Back to food item</Link>
        </div>
    );
}

export default EditFoodItems;