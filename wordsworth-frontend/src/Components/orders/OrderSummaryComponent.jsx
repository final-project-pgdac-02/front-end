import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faGift, faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


const OrderSummaryComponent = () => {

	const [cartItems,setCartItems]=useState([]);

	const userId = window.sessionStorage.getItem("sessionObjectId");

    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        getUserCart()
    },[]);

    const getUserCart = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/cart/`+userId);
            const res2= await axios.get(`http://localhost:8080/user/getuserdiscount/${userId}`)
            // const res = await axios.get(`http://localhost:8080/user/usercart/`+userId);
            console.log(res.data);
            setCartItems(res.data);
            setDiscount(res2.data);
        } catch (err) {
            console.log(err);
        }
    }

    const totalPrice=cartItems.reduce((total, item)=>(
        total+item.quantity*item.price
    ),0);

    const itemCount=cartItems.reduce((count, item)=>(
        count+item.quantity
    ),0)

	const roundedTotalPrice=Math.ceil(totalPrice*100)/100;


	const discountedTotal=totalPrice*(100-discount)/100;

	const roundedDiscountedTotal=Math.ceil(discountedTotal*100)/100;

	return (
		<div>
			<div className="card m-5 mx-auto border-4" style={{ width: "85%" }}>
				<div className="row g-0">
					<div className="card-body">
						<h5 className="card-title display-5 fs-1 text-center">Your Order Summary</h5>
						<hr />
					</div>
					<div className="card-body row mx-auto">
						<div className="col-6">
							<h6 className="card-title lead fs-4">Total Items</h6>
						</div>
						<div className="col-1">
							<h6 className="card-title lead fs-4">:</h6>
						</div>
						<div className="col-5 text-center">
							<h6 className="card-title lead fs-4">{itemCount}</h6>
						</div>
					</div>
					<div className="card-body row mx-auto">
						<div className="col-6">
							<h6 className="card-title lead fs-4">Order Total</h6>
						</div>
						<div className="col-1">
							<h6 className="card-title lead fs-4">:</h6>
						</div>
						<div className="col-5 text-center">
							<h6 className="card-title lead fs-4">₹ {roundedTotalPrice}</h6>
						</div>
					</div>
					<div className="card-body row mx-auto">
						<div className="col-6">
							<h6 className="card-title lead fs-4">Discounted Total</h6>
						</div>
						<div className="col-1">
							<h6 className="card-title lead fs-4">:</h6>
						</div>
						<div className="col-5 text-center">
							<h6 className="card-title lead fs-4">₹ {roundedDiscountedTotal}</h6>
						</div>
					</div>
					<div className="card-body row mx-auto">
						<div className="col-6">
							<h6 className="card-title lead fs-4">Order Date</h6>
						</div>
						<div className="col-1">
							<h6 className="card-title lead fs-4">:</h6>
						</div>
						<div className="col-5 text-center">
							<h6 className="card-title lead fs-4">{new Date().toLocaleDateString()}</h6>
						</div>
					</div>
					<div className="card-body row mx-auto">
						<div className="col">
							<hr />
						</div>
					</div>
					<div className="card-body row mx-auto">
						<div className="col text-center">
							<button className="btn btn-danger fw-light btn-lg fs-3 text-center">
								Place Order &nbsp;
								<FontAwesomeIcon icon={faGift} type="submit" />
							</button>
						</div>
					</div>
					<div className="card-body row mx-auto">
						<div className=" text-center lead fst-italic fs-5">
							You shop, we give &nbsp;
							<FontAwesomeIcon icon={faHandHoldingHeart} className="text-muted" />
						</div>
						<div className="col text-center lead  fs-6">
							With every purchase, ₹ 5 is donated to children in need towards their education.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummaryComponent;
