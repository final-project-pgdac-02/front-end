import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateOrderDetailStatusComponent = () => {
	// const [loading, setLoading] = useState(false);
	const role = window.sessionStorage.getItem("sessionObjectRole");
	const navigate = useNavigate();

	useEffect(() => {
		if (role !== "ADMIN") navigate("/forbidden");
	}, []);

	const [orderDetailId, setOrderDetailId] = useState();
	// const [orderIdEntered, setOrderIdEntered]=useState(false);
	const [showForm, setShowForm] = useState(false);

	const [newStatus, setNewStatus] = useState("");

	// const status=["PROCESSED","SHIPPED"];

	const [shippingStatus, setShippingStatus] = useState("");
	const onOrderDetailIdChangehandler = (event) => {
		setOrderDetailId(event.target.value);
		// setOrderIdEntered(false);
		console.log(event.target.value);
	};

	// const onShowShippingStatus = async () => {
	// 	try {
	// 		const res = await axios.get(`http://localhost:8080/orderdetails/shippingstatus/${orderDetailId}`);
	// 		if (res.data === "PENDING" || res.data === "PROCESSED" || res.data === "SHIPPED") {
	// 			setShippingStatus(res.data);
	// 			setShowForm(true);
	// 		} else {
	// 			alert(res.data);
	// 			setShowForm(false);
	// 		}
	// 	} catch (err) {
	// 		alert(err);
	// 	}
	// };

	const [showShipped, setShowShipped]=useState(false);

	const onShowShippingStatus = async () => {
		try {
			setShowShipped(false);
			const res = await axios.get(`http://localhost:8080/orderdetails/shippingstatus/${orderDetailId}`);
			if (res.data === "PENDING" || res.data === "PROCESSED") {
				setShippingStatus(res.data);
				setShowForm(true);
			}
			else if(res.data==="SHIPPED"){
				setShowShipped(true);
				setShowForm(false);
			}
			else {
				alert(res.data);
				setShowForm(false);
			}
		} catch (err) {
			alert(err);
		}
	};

	const onStatusChangeHandler = (event) => {
		setNewStatus(event.target.value);
		console.log(event.target.value);
	};

	const updateShippingStatus = async () => {
		try {
			const res = await axios.put(`http://localhost:8080/orderdetails/updatestatus`, {
				orderDetailId: orderDetailId,
				shippingStatus: newStatus,
			});
			alert(res.data);
			setShowForm(false);
		} catch (err) {
			alert(err);
		}
	};
	return (
		<div>
			<div class="card text-center mt-5 row align-items-center w-50 mx-auto shadow">
				{/* <div class="card-header">
                    Featured
                </div> */}
				<div className="row g-0 d-flex flex-wrap align-items-center">
					<div className="card-body">
						<h1 className="card-title display-4 text-center m-1 ">Update Shipping Status </h1>
						<hr />
					</div>
					<div className="card-body col-4 ">
						<div className="col-6 mx-auto">
							<h6 class="card-title fs-4 lead text-left">Enter order detail ID</h6>
							<input
								type="number"
								name="oid"
								id="oid"
								className="form-control col-6"
								value={orderDetailId}
								min={1}
								step={1}
								onChange={onOrderDetailIdChangehandler}
								// onBlur={onShowShippingStatus}
							/>
						</div>
						<br />
						<input
							type="button"
							value="Show Shipping Status"
							onClick={onShowShippingStatus}
							className="btn btn-warning btn-lg m-3"
						/>

						{
							showShipped &&
							 <div className="card mx-auto shadow-sm fs-4 lead my-4 w-50">
								 <strong>The item is already shipped!</strong>
							 </div>
						}
						{/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
						<br />
						{showForm && (
							<div className="col-6 mx-auto">
								<br />
								<label htmlFor="shippingStatus" className="form-label fs-5 lead">
									Shipping Status for Order Detail ID {orderDetailId}:
								</label>
								<input
									type="text"
									className="form-control"
									id="shippingStatus"
									aria-describedby="shippingStatus"
									value={shippingStatus}
									disabled
								/>
								<br />
								<br />
								<label htmlFor="shippingStatus" className="form-label fs-4 lead">
									Select a New Status
								</label>
								<select
									className="form-select"
									id="category"
									value={newStatus}
									onChange={onStatusChangeHandler}
								>
									<option value="" defaultValue>
										Select a Status
									</option>
									{
										shippingStatus==="PENDING" &&	<option value="PROCESSED">PROCESSED</option>
									}
									
									<option value="SHIPPED">SHIPPED</option>
								</select>
								<br />
								<button
									type="button"
									className="btn btn-success btn-lg m-3"
									onClick={updateShippingStatus}
								>
									Set Shipping Status
								</button>
							</div>
						)}
						{/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateOrderDetailStatusComponent;
