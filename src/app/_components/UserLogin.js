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
        <div>
            <div className="input-wrapper">
                <input type="text" className="input-field" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
                {error && !email && <span className="input-error">Please enter valid email</span> }
            </div>
            <div className="input-wrapper">
                <input type="password" className="input-field" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
                {error && !password && <span className="input-error">Please enter valid password</span> }
            </div>
            <div className="input-wrapper">
                <button onClick={loginHandle} className="button">Login</button>
            </div>
        </div>
    )
}
 
export default UserLogin;