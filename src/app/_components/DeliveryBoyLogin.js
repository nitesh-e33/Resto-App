import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const DeliveryBoyLogin=()=>{
    const [loginMobile, setLoginMobile] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    const loginHandle=async()=>{
        if(!loginMobile || !loginPassword) {
            setError(true)
            return false;
        } else {
            setError(false);
        }

        let response = await fetch("http://localhost:3000/api/deliverypartners/login",{
            method:"POST",
            body:JSON.stringify({mobile:loginMobile, password:loginPassword})
        });
        response = await response.json();
        if(response.success) {
            toast.success('Login Successfully.');
            const {result} = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('/deliverydashboard');
        } else {
            toast.error('Login failed. Please try again with valid data.')
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
          <div className="mb-4">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded"
              value={loginMobile}
              onChange={(e) => setLoginMobile(e.target.value)}
              placeholder="Enter Mobile Number"
            />
            {error && !loginMobile && <span className="input-error">Please enter valid mobile</span>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="p-1 border border-gray-300 rounded"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Enter Password"
            />
            {error && !loginPassword && <span className="input-error">Please enter valid password</span>}
          </div>
          <div>
            <button
              onClick={loginHandle}
              className="bg-blue-500 text-white w-56 p-1 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </div>
    );
}

export default DeliveryBoyLogin;