'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { API_BASE_URL, DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page=()=>{
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('user')));
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    const [total] = useState(()=>cartStorage?.length==1?cartStorage[0].price:cartStorage?.reduce((a,b)=>{
        return a.price+b.price
    }))
    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        if(!total){
            router.push('/');
        }
    },[total])

    const orderNow = async() => {
        let user_id = JSON.parse(localStorage.getItem('user'))._id;
        let city = JSON.parse(localStorage.getItem('user')).city;

        let cart = JSON.parse(localStorage.getItem('cart')); 
        let foodItemIds = cart.map((item)=>item._id).toString();
        let deliveryBoyResponse = await fetch(`${API_BASE_URL}/deliverypartners/`+city)
        deliveryBoyResponse = await deliveryBoyResponse.json();
        let deliveryBoyIds = deliveryBoyResponse.result.map((item)=>item._id);
        let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random()*deliveryBoyIds.length)]
        if(!deliveryBoy_id) {
            toast.error('Delivery Partner is not available.');
            return false;
        }

        let resto_id = cart[0].resto_id;

        let collection = {
            user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status:'confirm',
            amount:total+DELIVERY_CHARGES+(total*TAX/100),
        }
        // console.log(collection);
        let response = await fetch(`${API_BASE_URL}/order`,{
            method:'POST',
            body:JSON.stringify(collection)
        });
        response = await response.json();
        if(response.success) {
            toast.success('Order Confirmed');
            setRemoveCartData(true);
            router.push('myprofile');
        } else {
            toast.error('Order Failed');
        }
    }

    return (
        <div>
            <CustomerHeader removeCartData={removeCartData} />
            <div className="total-wrapper">
                <div className="block-1">
                    <h2 className="text-2xl font-bold ml-4">User Details</h2>
                    <div className="row">
                        <span>Name : </span>
                        <span>{userStorage.name}</span>
                    </div>
                    <div className="row">
                        <span> Address : </span>
                        <span>{userStorage.address}</span>
                    </div>
                    <div className="row">
                        <span>Mobile No. : </span>
                        <span>{userStorage.mobile}</span>
                    </div>
                    <h2 className="text-2xl font-bold ml-4">Amount Details</h2>
                    <div className="row">
                        <span>Food Charges : </span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax : </span>
                        <span>{total*TAX/100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges : </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount : </span>
                        <span>{total+DELIVERY_CHARGES+(total*TAX/100)}</span>
                    </div>
                    <h2 className="text-2xl font-bold ml-4">Payment Method</h2>
                    <div className="row">
                        <span>Cash on Delivery : </span>
                        <span>Rs {total+DELIVERY_CHARGES+(total*TAX/100)}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Place Your Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page;