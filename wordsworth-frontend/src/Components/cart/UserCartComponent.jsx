import axios from 'axios';
import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItemComponent from './CartItemComponent';

import CartTotalComponent from './CartTotalComponent'
import EmptyCartComponent from './EmptyCartComponent';

const UserCartComponent = () => {
    const userId = window.sessionStorage.getItem("sessionObjectId");

    const navigate = useNavigate();


    const [isUpdated, setIsUpdated] = useState(0);

    const update = (x) => {
        setIsUpdated(isUpdated + x);
        getUserCart();
        console.log("hellooo")
    }

    // const [itemCount,setItemCount]=useState(0);



    useEffect(() => {
        if (!userId) {
            alert("You need to login to view your cart")
            navigate("/login")
        }
    }, [userId, navigate])

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        getUserCart()
    }, []);

    const getUserCart = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/cart/` + userId);
            const res2 = await axios.get(`http://localhost:8080/user/getuserdiscount/${userId}`)
            // const res = await axios.get(`http://localhost:8080/user/usercart/`+userId);
            console.log(res.data);
            console.log("RUNNNNNNNNNNNNNNNNNNNNNNINNNNNNNNNNNNNNGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
            setCartItems(res.data);
            setDiscount(res2.data);
            setLoading(true)
        } catch (err) {
            console.log(err);
        }
    }

    const totalPrice = cartItems.reduce((total, item) => (
        total + item.quantity * item.price
    ), 0);

    const itemCount = cartItems.reduce((count, item) => (
        count + item.quantity
    ), 0)

    return (
        <div>
            {loading && cartItems.length !== 0 &&
                <div className="row mx-auto">
                    <div className="col-8">
                        {loading && cartItems.length !== 0 &&
                            cartItems.map((item, i) => (
                                <CartItemComponent key={i} item={item} update={update} />

                            ))}
                    </div>
                    <div className="col-4">
                        {cartItems.length !== 0 &&
                            <CartTotalComponent
                                userId={userId}
                                itemCount={itemCount}
                                totalPrice={totalPrice}
                                discount={discount}
                            />
                        }

                    </div>
                </div>
            }

            {loading && cartItems.length === 0 &&
                <div>
                    <EmptyCartComponent />
                </div>
            }

        </div>
    );
}

export default UserCartComponent