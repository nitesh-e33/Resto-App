'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useRouter } from "next/navigation";
import DeliveryBoyLogin from "../_components/DeliveryBoyLogin";
import DeliveryBoySignup from "../_components/DeliveryBoySignup";

const Page=()=>{
    const [login, setLogin] = useState(true);
    const router = useRouter();

    useEffect(()=>{
        const delivery = JSON.parse(localStorage.getItem('delivery'))
        if(delivery) {
            router.push('/deliverydashboard');
        }
    }, [])

    return (
        <div className="container">
            <DeliveryHeader />
            <h1>Delivery Partner Login/SignUp</h1>
            {login ? <DeliveryBoyLogin /> : <DeliveryBoySignup />}

            <div>
                <button className="button-link" onClick={() => setLogin(!login)}>
                    {login ? "Do not have Account? SignUp" : "Already have Account? Login"}
                </button>
            </div>
        </div>
    )
}

export default Page;