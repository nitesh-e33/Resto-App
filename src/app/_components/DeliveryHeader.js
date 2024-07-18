'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeliveryHeader=(props)=>{
    const [details, setDetails] = useState();
    const router = useRouter();

    useEffect(() => {
        let data = localStorage.getItem('delivery');
        if(!data) {
            router.push('/deliverypartner');
        } else {
            setDetails(JSON.parse(data))
        }
    }, [])

    const logout=()=>{
        localStorage.removeItem('delivery');
        router.push('/deliverypartner');
    }

    return (
        <div className="header-wrapper">
            <div className="logo">
                <img style={{width:100}} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" />
            </div>
            <ul>
                <li><Link href="/">Home</Link></li>
                {
                    details ?
                        <li><button onClick={logout}>Logout</button></li>
                        : <li><Link href="/deliverypartner">Login/Signup</Link></li>
                }
            </ul>
        </div>
    )
}

export default DeliveryHeader;