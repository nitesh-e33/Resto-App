'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader=(props)=>{
    // const userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('cart')) : null;
    const userStorage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    const cartStorage = localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'));
    const [user, setUser] = useState(userStorage?userStorage:undefined)
    const [cartNumber, setCartNumber] = useState(cartStorage?.length);
    const [cartItem, setCartItem] = useState(cartStorage);
    const router = useRouter();

    useEffect(()=>{
        if(props.cartData) {
            if(cartNumber) {
                if(cartItem[0].resto_id != props.cartData.resto_id) {
                    localStorage.removeItem('cart');
                    setCartNumber(1);
                    setCartItem([props.cartData]);
                    localStorage.setItem('cart', JSON.stringify([props.cartData]));
                } else {
                    let localCartItem = cartItem;
                    localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
                    setCartItem(localCartItem);
                    setCartNumber(cartNumber+1);
                    localStorage.setItem('cart', JSON.stringify(localCartItem))
                }
            } else {
                setCartNumber(1);
                setCartItem([props.cartData]);
                localStorage.setItem('cart', JSON.stringify([props.cartData]));
            }
        } 
    }, [props.cartData]);

    useEffect(()=>{
        if(props.removeCartData) {
            let localCartItem = cartItem.filter((item)=>{
                return item._id != props.removeCartData
            });
            setCartItem(localCartItem);
            setCartNumber(cartNumber-1);
            localStorage.setItem('cart', JSON.stringify(localCartItem));
            if(localCartItem.length === 0) {
                localStorage.removeItem('cart');
            }
        } 
    }, [props.removeCartData]);

    const logout=()=>{
        localStorage.removeItem('user');
        router.push('/user-auth');
    }

    return (
        <div className="header-wrapper bg-white p-4 flex justify-between items-center">
            <div className="logo">
            <img
                className="w-24"
                src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
                alt="Logo"
            />
            </div>
            <ul className="flex space-x-4 text-black">
                <li>
                    <Link className="hover:underline" href="/">Home</Link>
                </li>
                {user ? (
                    <>
                    <li>
                        <Link className="hover:underline" href="/myprofile">{user?.name}</Link>
                    </li>
                    <li>
                        <button
                        onClick={logout}
                        className="hover:underline text-black"
                        >
                        Logout
                        </button>
                    </li>
                    </>
                ) : (
                    <>
                    <li>
                        <Link className="hover:underline" href="/user-auth">Login/Signup</Link>
                    </li>
                    </>
                )}
                <li>
                    <Link className={`hover:underline ${cartNumber ? '' : 'cursor-not-allowed'}`} href={cartNumber ? "/cart" : "#"}>Cart({cartNumber ? cartNumber : 0})</Link>
                </li>
                <li>
                    <Link className="hover:underline" href="/restaurant">Add Restaurant</Link>
                </li>
                <li>
                    <Link className="hover:underline" href="/deliverypartner">Delivery Partner</Link>
                </li>
            </ul>
        </div>
    );
}

export default CustomerHeader;