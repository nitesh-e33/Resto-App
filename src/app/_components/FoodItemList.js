'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeleteModal from "./modal/DeleteModal";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    if (restaurantData) {
      const resto_id = restaurantData._id;
      let response = await fetch(`http://localhost:3000/api/restaurant/foods/${resto_id}`);
      response = await response.json();
      if (response.success) {
        setFoodItems(response.result);
      } else {
        alert("Food item list is not loading");
      }
    }
  };

  const handleShowModal = (id) => {
    setItemId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemId(null);
  };

  const handleConfirmDelete = async () => {
    let response = await fetch(`http://localhost:3000/api/restaurant/foods/${itemId}`, {
      method: "DELETE"
    });
    response = await response.json();
    if (response.success) {
      loadFoodItems();
    } else {
      alert("Food Item not deleted.");
    }
    handleCloseModal();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Food Items</h1>
      <DeleteModal show={showModal} handleClose={handleCloseModal} handleConfirm={handleConfirmDelete} />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">S.No</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Operations</th>
          </tr>
        </thead>
        <tbody>
          {foodItems && foodItems.map((item, key) => (
            <tr key={key}>
              <td className="py-2 px-4 border-b">{key + 1}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.price}</td>
              <td className="py-2 px-4 border-b">{item.description}</td>
              <td className="py-2 px-4 border-b"><img src={item.img_path} alt={item.name} className="w-12 h-12" /></td>
              <td className="py-2 px-4 border-b">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push(`dashboard/${item._id}`)}>Edit</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleShowModal(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;

