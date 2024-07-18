import { useRouter } from "next/navigation";
import { useState } from "react";

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
            const {result} = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('/deliverydashboard');
        } else {
            alert('Login failed. Please try again with valid data.');
        }
    }

    return (
        <div>
            <div className="input-wrapper">
                <input type="text" className="input-field" value={loginMobile} onChange={(e)=>setLoginMobile(e.target.value)} placeholder="Enter Mobile Number"/>
                { error && !loginMobile && <span className="input-error">Please enter valid mobile</span> }
            </div>
            <div className="input-wrapper">
                <input type="password" className="input-field" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} placeholder="Enter Password"/>
                { error && !loginPassword && <span className="input-error">Please enter valid password</span> }
            </div>
            <div className="input-wrapper">
                <button onClick={loginHandle} className="button">Login</button>
            </div>
        </div>
    )
}

export default DeliveryBoyLogin;