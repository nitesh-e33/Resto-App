import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../lib/constant";

const RestaurantLogin=()=>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const router = useRouter();


    const handleLogin = async() => {
        if(!email || !password) {
            setError(true);
            return false
        } else {
            setError(false);
        }
        let response = await fetch(`${API_BASE_URL}/restaurant`, {
            method:"POST",
            body:JSON.stringify({email,password,login:true})
        })
        response = await response.json();
        if(response.success){
            toast.success("Login Successfully");
            const {result} = response
            delete result.password
            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push('restaurant/dashboard');
        } else {
            toast.error("Login Failed. Please try again later!!");
        }
    }
    return (
        <div className="max-w-md mx-auto p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Email ID"
              className="p-1 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && !email && <span className="input-error">Please enter valid email</span>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter Password"
              className="p-1 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && !password && <span className="input-error">Please enter valid password</span>}
          </div>
          <div>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white w-56 p-1 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </div>
    );
}

export default RestaurantLogin;