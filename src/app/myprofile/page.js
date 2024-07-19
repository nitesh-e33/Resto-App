'use client'
import { useState , useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { API_BASE_URL } from "../lib/constant";

const Page=()=>{
    const [myOrders, setMyOrders] = useState([]);
    useEffect(()=>{
        getMyOrders();
    }, [])
    
    const getMyOrders=async()=>{
        const userStorage = JSON.parse(localStorage.getItem('user'));
        let response = await fetch(`${API_BASE_URL}/order?id=`+userStorage._id);
        response = await response.json();
        if(response.success) {
            setMyOrders(response.result);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <CustomerHeader />
            <div className="container mx-auto py-6">
                {
                    myOrders.length > 0 ? (
                        myOrders.map((item, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto">
                                <h4 className="text-xl font-bold mb-2">Name: {item.data.name}</h4>
                                <div className="text-gray-700 mb-1">Amount: {item.amount}</div>
                                <div className="text-gray-700 mb-1">Address: {item.data.address}</div>
                                <div className={`text-gray-700 ${item.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                                    Status: {item.status}
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-2xl font-bold text-center text-gray-700">Orders Not Found Here</h1>
                    )
                }
            </div>
            <Footer />
        </div>
    );
}

export default Page;