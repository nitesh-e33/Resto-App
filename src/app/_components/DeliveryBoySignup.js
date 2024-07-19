import { toast } from "react-toastify";
import { API_BASE_URL } from "../lib/constant";

const { useRouter } = require("next/navigation");
const { useState } = require("react");

const DeliveryBoySignup=()=>{
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const router = useRouter();

    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSignUp=async()=>{
        if(password !== confirmPassword) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
        }
        if(!name || !mobile || !password || !confirmPassword || !city || !address) {
            setError(true)
            return false;
        } else {
            setError(false);
        }

        let response = await fetch(`${API_BASE_URL}/deliverypartners/signup`,{
            method:"POST",
            body:JSON.stringify({name,mobile,password,city,address})
        });
        response = await response.json();
        if(response.success) {
            toast.success('User Registered Successfully!!');
            const {result} = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('/deliverydashboard');
        } else {
            toast.error('User Signup failed');
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
          <div className="mb-4">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
            {error && !name && <span className="input-error">Please enter valid name</span>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter Mobile"
            />
            {error && !mobile && <span className="input-error">Please enter valid mobile</span>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="p-1 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
            {passwordError && <span className="input-error">Password and Confirm Password do not match</span>}
            {error && !password && <span className="input-error">Please enter valid password</span>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="p-1 border border-gray-300 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
            />
            {passwordError && <span className="input-error">Password and Confirm Password do not match</span>}
            {error && !confirmPassword && <span className="input-error">Please enter valid confirm password</span>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City"
            />
            {error && !city && <span className="input-error">Please enter valid city</span>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
            />
            {error && !address && <span className="input-error">Please enter valid address</span>}
          </div>
          <div>
            <button
              onClick={handleSignUp}
              className="bg-blue-500 text-white w-56 p-1 rounded hover:bg-blue-600"
            >
              Signup
            </button>
          </div>
        </div>
    );
}

export default DeliveryBoySignup;