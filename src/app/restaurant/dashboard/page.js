'use client';
import RestaurantHeader from "./../../_components/RestaurantHeader";
import './../style.css';
import AddFoodItem from "./../../_components/AddFoodItem";
import { useState } from "react";
import FoodItemList from "./../../_components/FoodItemList";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false); 

  return (
    <div className="mx-4">
      <RestaurantHeader />
      <button className="px-4 mx-2 mt-4 py-1 bg-gray-500 text-white rounded" onClick={() => setAddItem(true)}>Add Food</button>
      <button className="px-4 py-1 bg-gray-500 text-white rounded" onClick={() => setAddItem(false)}>Dashboard</button>
      {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
    </div>
  );
};

export default Dashboard;

