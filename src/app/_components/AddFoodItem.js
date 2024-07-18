import { useState } from "react";

const AddFoodItem=(props)=>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);

    const handleAddFoodItem=async()=>{
        // console.log(name,path,price,description);
        if(!name || !path || !price || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
        }
        let resto_id;
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        if(restaurantData) {
            resto_id = restaurantData._id;
        }
        let response = await fetch("http://localhost:3000/api/restaurant/foods", {
            method:"POST",
            body:JSON.stringify({name,price,img_path:path,description,resto_id})
        })
        response = await response.json();
        if(response.success) {
            alert("Food Item Added");
            props.setAddItem(false);
        } else {
            alert("Food Item not Added");
        }
    }

    return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Add New Food Item</h1>
          <div className="mb-4">
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded"
              placeholder="Enter food name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className="input-error">Please enter a valid name</span>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="input-error">Please enter a valid price</span>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded"
              placeholder="Enter path name"
              value={path}
              onChange={(e) => setPath(e.target.value)}
            />
            {error && !path && <span className="input-error">Please enter a valid path</span>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && !description && <span className="input-error">Please enter a valid description</span>}
          </div>
          <div>
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleAddFoodItem}
            >
              Add Food Item
            </button>
          </div>
        </div>
      );
}

export default AddFoodItem;