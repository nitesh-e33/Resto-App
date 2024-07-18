"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";
import './style.css';

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="container">
        <RestaurantHeader  />
        <h1>Restaurant Login/SignUp Page</h1>
        {login ? <RestaurantLogin /> : <RestaurantSignup />}
        
        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login ? "Do not have Account? SignUp" : "Already have Account? Login"}
          </button>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Restaurant;
