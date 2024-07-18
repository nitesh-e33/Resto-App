import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin=(props)=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    const loginHandle=async()=>{
        if(!email || !password) {
            setError(true);
            return false;
        }
        let response = await fetch("http://localhost:3000/api/user/login",{
            method:"POST",
            body:JSON.stringify({email, password})
        });
        response = await response.json();
        if(response.success) {
            const {result} = response;
            delete result.password;
            localStorage.setItem('user', JSON.stringify(result));
            if(props?.redirect?.order) {
                router.push('/order');
            } else {
                router.push('/');
            }
        } else {
            alert('Login failed. Please try again with valid data.');
        }
    }
    return (
        <div className="max-w-md mx-auto p-4">
          <div className="mb-4">
            <input
              type="text"
              className="p-1 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            {error && !email && <span className="input-error">Please enter a valid email</span>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="p-1 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
            {error && !password && <span className="input-error">Please enter a valid password</span>}
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
 
export default UserLogin;