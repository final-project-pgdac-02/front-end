import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const CartTotalComponent = (props) => {

	// useEffect(() => {
    //    getCartTotal();
    // }, []);

		const [cartInfo,setCartInfo]=useState(0);


		const discount=props.discount;

		const discountedTotal=props.totalPrice*(100-discount)/100;

	// const getCartTotal=async()=>{
	// 	const res=await axios.get(`http://localhost:8080/cart/getcarttotal/${props.userId}`);
	// 	setCartInfo(res.data);
	// }


	return (
		<div>
			<div className="card m-3 p-0 shadow" style={{ maxWidth: "30rem" }}>
				<div className="row g-0">
					<div className="card-body">
						<h5 className="card-title display-5 fs-1 text-center">Your Cart Summary</h5>
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
							{/* <h6 className="card-title lead fs-4">{cartInfo.totalItems}</h6> */}
							<h6 className="card-title lead fs-4">{props.itemCount}</h6>
							
						</div>
					</div>
					<div className="card-body row mx-auto">
						<div className="col-6">
							<h6 className="card-title lead fs-4">Subtotal</h6>
						</div>
						<div className="col-1">
							<h6 className="card-title lead fs-4">:</h6>
						</div>
						<div className="col-5 text-center">
						<h6 className="card-title lead fs-4">₹ {props.totalPrice.toFixed(2)}</h6>
							{/* <h6 className="card-title lead fs-4">₹ {cartInfo.cartSubTotal}</h6> */}
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
							{/* <h6 className="card-title lead fs-4">₹ {cartInfo.discountedTotal}</h6> */}
							<h6 className="card-title lead fs-4">₹ {discountedTotal.toFixed(2)}</h6>
						</div>
					</div>

					<div className="card-body row mx-auto">
						<div className="col">
							<hr />
						</div>
					</div>
					<div className="card-body row mx-auto">
						<div className="col text-center">
							<button className="btn btn-warning fw-light btn-lg fs-3 text-center">
								Proceed To Buy &nbsp;<FontAwesomeIcon icon={faShoppingBasket} />
							</button>
						</div>
					</div>
					<div className="card-body row mx-auto">
						<div className="col">
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartTotalComponent;
