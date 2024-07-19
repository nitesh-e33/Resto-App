'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../lib/constant";

const Page=()=>{
    const router = useRouter();
    const [myOrders, setMyOrders] = useState([]);

    useEffect(()=>{
        getMyOrders();
    }, [])
    
    const getMyOrders=async()=>{
        const deliveryData = JSON.parse(localStorage.getItem('delivery'));
        let response = await fetch(`${API_BASE_URL}/deliverypartners/orders/`+deliveryData?._id);
        response = await response.json();
        console.log(response);
        if(response.success) {
            setMyOrders(response.result);
        }
    }

    useEffect(()=>{
        const delivery = JSON.parse(localStorage.getItem('delivery'))
        if(!delivery) {
            router.push('/deliverypartner');
        }
    }, [])

    return (
        <div>
            <DeliveryHeader />
            <h1>My Order List</h1>
            {
                myOrders.length>0 ? myOrders.map((item)=>(
                    <div className="restaurant-wrapper">
                        <h4>Name: {item.data.name}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Address: {item.data.address}</div>
                        <div>Status: {item.status}</div>
                        <div>
                            Update Status:
                            <select>
                                <option>Confirm</option>
                                <option>On the Way</option>
                                <option>Delivered</option>
                                <option>Failed to Delivered</option>
                            </select>
                        </div>
                    </div>
                ))
                : <h3>Orders Not Found Here</h3>
            }
        </div>
    )
}

export default Page;