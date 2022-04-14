import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

const UpgradeMembershipComponent = () => {
	let originalPlan = "SILVER";

	const getMembershipList = async () => {
		try {
			const res = await axios.get("http://localhost:8080/memberships/");
			setMembershipList(res.data);
            // if (membershipList.length !== 0) {
			// 	console.table(membershipList);
			// 	console.log(membershipList.length);
			// 	setLoading(true);
			// }
		} catch (err) {
			alert(err);
		}
	};
	const [membershipList, setMembershipList] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		window.scrollTo(0, 0);
		getMembershipList();
		// if (membershipList.length !== 0) {
		// 	console.table(membershipList);
		// 	console.log(membershipList.length);
			setLoading(true);
		// }
	}, []);

	const [plan, setPlan] = useState("");

	const [planErr, setPlanErr] = useState("");

	const selectHandler = (e) => {
		console.log(e.target.value);
		setPlan(e.target.value);
		console.log(plan);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (plan === originalPlan) {
		}
	};

	return (
		<>
			{loading && (
				<div>
					<br />
					<br />
					<div className="card mx-auto shadow" style={{ width: "45%" }}>
						<div className="row g-0 d-flex flex-wrap align-items-center">
							<div className="card-body">
								<h1 className="card-title display-4 text-center m-1 ">Upgrade Membership </h1>
								<hr />
							</div>
							<form onSubmit={submitHandler}>
								<div className=" col-6 mx-auto m-3 ">
									<label htmlFor="id" className="form-label ">
										User ID
									</label>
									<input
										type="text"
										className="form-control"
										id="id"
										aria-describedby="id"
										disabled
									/>
								</div>
								<div className="m-3 col-6 mx-auto  ">
									<label htmlFor="exampleInputPassword1" className="form-label ">
										Current Membership
									</label>
									<input
										type="text"
										className="form-control"
										id="exampleInputPassword1"
										value={"SILVER"}
										disabled
									/>
								</div>
								<div className=" form-group m-3 col-6 mx-auto  ">
									<label className="form-label">Category</label>
									<select className="form-select" id="category" onChange={selectHandler}>
										<option value="" defaultValue disabled>
											Select a Plan
										</option>
										<option value="REGULAR">Regular with 10% Discount</option>
										<option value="SILVER">Silver with 15% Discount</option>
										<option value="GOLD">Gold with 20% Discount</option>
										<option value="DIAMOND">Diamond with 25% Discount</option>
										<option value="PLATINUM">Platinum with 30% Discount</option>
									</select>
								</div>
								<br />
								<div className="m-3 col-6 mx-auto  ">
									{/* <label htmlFor="exampleInputPassword2" className="form-label ">
								You Agree To Pay
							</label>
							<input
								type="number"
								className="form-control"
								id="exampleInputPassword2"
								value={2000}
								disabled
							/> */}
									<div class="input-group mb-3">
										<span class="input-group-text text-muted" id="basic-addon1">
											You Agree To Pay ₹
										</span>
										<input
											type="number"
											class="form-control"
											placeholder="Username"
											aria-label="Username"
											aria-describedby="basic-addon1"
											value={2000}
										/>
									</div>
								</div>
								<div className="text-center col-6 mx-auto m-5">
									<button type="submit" className="btn btn-danger fs-4">
										Proceed to Pay &nbsp; <FontAwesomeIcon icon={faCreditCard} />
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UpgradeMembershipComponent;
