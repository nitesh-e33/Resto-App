import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignup=()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setc_password] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const router = useRouter();
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSignup=async()=>{
        if(password !== c_password) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
        }
        if(!email || !password || !c_password || !name || !city || !address || !contact) {
            setError(true)
            return false;
        } else {
            setError(false);
        }
        let response = await fetch('http://localhost:3000/api/restaurant',{
            method:"POST",
            body:JSON.stringify({email, password, name, city, address, contact})
        })
        response = await response.json();
        if(response.success){
            // alert('Restaurant Registered Successfully.')
            const {result} = response
            delete result.password;
            localStorage.setItem('restaurantUser', JSON.stringify(result));
            router.push('restaurant/dashboard');
        }
    }
    return (
        <div className="max-w-md mx-auto p-4 space-y-4">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter Email ID"
              className="p-1 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && !email && <span className="input-error">Please enter valid email</span>}
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Enter Password"
              className="p-1 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <span className="input-error">Password and Confirm Password do not match</span>}
            {error && !password && <span className="input-error">Please enter valid password</span>}
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-1 border border-gray-300 rounded"
              value={c_password}
              onChange={(e) => setc_password(e.target.value)}
            />
            {passwordError && <span className="input-error">Password and Confirm Password do not match</span>}
            {error && !c_password && <span className="input-error">Please enter valid confirm password</span>}
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter Restaurant Name"
              className="p-1 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className="input-error">Please enter valid restaurant name</span>}
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter City"
              className="p-1 border border-gray-300 rounded"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {error && !city && <span className="input-error">Please enter valid city</span>}
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter Full Address"
              className="p-1 border border-gray-300 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {error && !address && <span className="input-error">Please enter valid address</span>}
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter Contact No."
              className="p-1 border border-gray-300 rounded"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            {error && !contact && <span className="input-error">Please enter valid Contact</span>}
          </div>
          <div className="input-wrapper">
            <button
              onClick={handleSignup}
              className="bg-blue-500 text-white w-56 p-1 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      );
}

export default RestaurantSignup;
