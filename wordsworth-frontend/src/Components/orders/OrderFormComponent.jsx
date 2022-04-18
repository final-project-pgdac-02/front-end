import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressListComponent from "./AddressListComponent";
import CardListComponent from "./CardListComponent";
import OrderSummaryComponent from "./OrderSummaryComponent";
const OrderFormComponent = () => {

	const navigate = useNavigate();

	useEffect(() => {
		if(!userId){
			alert("You need to login first");
			navigate("/")
		}
	}, []);

	const [selectedAddressId, setSelectedAddressId]=useState("");
	const [selectedCardId, setSelectedCardId] = useState("");
	const [addrErr, setAddrError] = useState("");
	const [cardErr, setCardError] = useState("");

	const addrSelectHandler = async(value) => {
		console.log(value + " In grand parent addr");     
		setSelectedAddressId(value);
        if (selectedAddressId === null || selectedAddressId === "") {
			setAddrError("");
		}
	};
	const cardSelectHandler = (value) => {
		console.log(value + " In grand parent card");
		setSelectedCardId(value);
        if (selectedCardId === null || selectedCardId === "") {
			setCardError("");
		}
	};


	const validation = () => {
		let flag = true;

		if (selectedAddressId === null || selectedAddressId === "") {
			setAddrError("Please select a delivery address!");
			flag = false;
		}

		if (selectedCardId === null || selectedCardId === "") {
			setCardError("Please select a payment method!");
			flag = false;
		}

		if (flag) {
			return true;
		}
	};

	const userId = window.sessionStorage.getItem("sessionObjectId");

	const placeOrder=async()=>{
		const res=await axios.post("http://localhost:8080/orders/placeorder",{
			"userId": parseInt(userId),
			"addressId": parseInt(selectedAddressId),
			"cardId": parseInt(selectedCardId)
		})

		alert(res.data);
	}

	const buyNowHandler = async(event) => {
		event.preventDefault();

		if (validation()) {
            setAddrError("");
            setCardError("");
			console.log(selectedAddressId);
			await placeOrder();
			navigate("/");
            // alert("Order Placed!");
		}
	};

	return (
		<div>
			<div>
				<br />
				<br />
				<div className="card mx-auto shadow" style={{ width: "55%" }}>
					<div className="card-body">
						<h5 className="card-title fw-light display-4 text-center">Order Now</h5>

						<div className="row g-0 d-flex flex-wrap align-items-center">
							<div className="m-4 card-body">
								<ul className="nav nav-tabs nav-justified" id="myTab">
									<li className="nav-item card-title fs-4">
										<a href="#address" className="nav-link" data-bs-toggle="tab">
											Delivery Address
										</a>
									</li>
									<li className="nav-item card-title fs-4 ">
										<a href="#card" className="nav-link" data-bs-toggle="tab">
											Payment Method
										</a>
									</li>
									<li className="nav-item card-title fs-4">
										<a href="#summary" className="nav-link" data-bs-toggle="tab">
											Order Summary
										</a>
									</li>
								</ul>
								<form onSubmit={buyNowHandler}>
									<div className="tab-content">
										<div className="tab-pane fade" id="address">
											<AddressListComponent getData={addrSelectHandler} />
										</div>
										<div className="tab-pane fade" id="card">
											<CardListComponent getData={cardSelectHandler} />
										</div>
										<div className="tab-pane fade" id="summary">
											<OrderSummaryComponent />
										</div>
									</div>
								</form>
								<div className="text-danger text-center fs-4">{addrErr}</div>
								<div className=" text-danger text-center fs-4">{cardErr}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderFormComponent;
