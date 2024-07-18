import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignUp=(props)=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
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
        }
        if(!name || !email || !mobile || !password || !confirmPassword || !city || !address) {
            setError(true)
            return false;
        }
        // console.log(name, email, password, confirmPassword, mobile, city, address);
        let response = await fetch("http://localhost:3000/api/user",{
            method:"POST",
            body:JSON.stringify({name,email,password,city,address,mobile})
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
            alert('User SignUp failed');
        }
    }

    return (
        <div>
            <div className="input-wrapper">
                <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                { error && !name && <span className="input-error">Please enter valid name</span> }
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                { error && !email && <span className="input-error">Please enter valid email</span> }
            </div>
            <div className="input-wrapper">
                <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                { passwordError && <span className="input-error">Password and Confirm Password not match</span> }
                { error && !password && <span className="input-error">Please enter valid password</span> }
            </div>
            <div className="input-wrapper">
                <input type="password" className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter Confirm Password" />
                { passwordError && <span className="input-error">Password and Confirm Password not match</span> }
                { error && !confirmPassword && <span className="input-error">Please enter valid confirm password</span> }
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Mobile" />
                { error && !mobile && <span className="input-error">Please enter valid mobile</span> }
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City" />
                { error && !city && <span className="input-error">Please enter valid city</span> }
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" />
                { error && !address && <span className="input-error">Please enter valid address</span> }
            </div>
            <div className="input-wrapper">
                <button onClick={handleSignUp} className="button">Signup</button>
            </div>
        </div>
    )
}

export default UserSignUp;