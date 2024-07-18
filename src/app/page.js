'use client';
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/customer/locations");
      response = await response.json();
      if (response.success) {
        setLocations(response.result);
      }
    } catch (error) {
      console.error("Failed to load locations:", error);
    }
  };

  const loadRestaurants = async (params = {}) => {
    try {
      let url = "http://localhost:3000/api/customer";
      const queryParams = new URLSearchParams(params).toString();
      if (queryParams) {
        url += `?${queryParams}`;
      }
      console.log(url);
      let response = await fetch(url);
      response = await response.json();
      console.log(response);
      if (response.success) {
        setRestaurants(response.result);
      } else {
        setRestaurants([]);
      }
    } catch (error) {
      console.error("Failed to load restaurants:", error);
    }
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    loadRestaurants({ location, restaurant: searchText });
  };

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    loadRestaurants({ location: selectedLocation, restaurant: searchText });
  };

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1 className="text-4xl font-bold">Food Delivery App</h1>
        <div className="input-wrapper">
          <select value={selectedLocation} onChange={handleLocationChange} className="select-input">
            <option value="">Select Place</option>
            {locations.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          <input 
            type="text" className="search-input" onChange={handleSearchChange} placeholder="Enter Restaurant Name" />
        </div>
      </div>
      <div className="restaurant-list-container">
        {restaurants.map((item) => (
          <div
            key={item._id}
            onClick={() => router.push(`explore/${item.name}?id=${item._id}`)}
            className="restaurant-wrapper"
          >
            <div className="heading-wrapper font-bold">
              <h3 className="text-xl">{item.name}</h3>
              <h5 className="text-lg">Contact: {item.contact}</h5>
            </div>
            <div className="address-wrapper">
              <div>{item.city},</div>
              <div className="address">
                {item.address}, Email: {item.email}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
