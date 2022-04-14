import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

const UpgradeMembershipComponent = () => {

	const [showPriceTier, setShowPriceTier]=useState(false);

	useEffect(() => {
		getDetails();
	}, []);

	const [membershipList, setMembershipList] = useState([]);
	const [loading, setLoading] = useState(false);
	const userId = window.sessionStorage.getItem("sessionObjectId");
	const userFirstName = window.sessionStorage.getItem("sessionObjectFirstName");
	const userLastName = window.sessionStorage.getItem("sessionObjectLastName");
	const [userMembership, setUserMembership]=useState();

	const [chosenMembership, setChosenMemberhsip]=useState();

	const [membershipCost,setMembershipCost]=useState(0);

	// const

	const getUserMembershipDetails=async()=>{
		try{
			const res=await axios.get(`http://localhost:8080/user/membership/${userId}`);
		setUserMembership(res.data);
		setChosenMemberhsip(res.data.id)
		// setLoading(true);
		}
		catch(err){
			console.log(err);
		}
		
	}
	// let originalPlan = "SILVER";

	const getMembershipList = async () => {
		try {
			const res = await axios.get("http://localhost:8080/memberships/");
			setMembershipList(res.data);
		} catch (err) {
			alert(err);
		}
	};

	const getDetails=async()=>{
		await getMembershipList();
		await getUserMembershipDetails();
		setLoading(true);
	}

	const onMemberShipChooseHandler=async (event)=>{
		setChosenMemberhsip(event.target.value);
		console.log(chosenMembership);
		console.log("user mem: "+userMembership.id)
		await getShowPriceTier();
	}

	useEffect(() => {
		getShowPriceTier();
	}, [chosenMembership]);

	const getShowPriceTier=async()=>{
		if(parseInt(chosenMembership)!==parseInt(userMembership.id)){
			setShowPriceTier(true);
			console.log("trueeeeee");
		}
		else{
			setShowPriceTier(false);
			console.log("falseeeeee");
		}
		getMembershipCost(chosenMembership);
	}

	const getMembershipCost=(chosenMembership)=>{
		const membership=membershipList.filter(item=>parseInt(item.id)===parseInt(chosenMembership))
		console.log(membership[0].membershipCost);
		setMembershipCost(membership[0].membershipCost);
	}

	const onPayClickHandler=async()=>{
		const confirm=window.confirm(`You are about to pay: ₹ ${membershipCost}`);
		if(confirm){
			try{
				const res=await axios.put(`http://localhost:8080/user/upgrademembership/`,{
			userId:userId,
			membershipId:chosenMembership
		})
		alert(res.data);
			}
			catch(err){
				alert(err);
			}	
		}
		
	}

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
							<form>
								<div className=" col-6 mx-auto m-3 ">
									<label htmlFor="id" className="form-label ">
										User ID
									</label>
									<input
										type="text"
										className="form-control"
										id="id"
										aria-describedby="id"
										value={userId}
										disabled
									/>
								</div>
								<div className=" col-6 mx-auto m-3 ">
									<label htmlFor="id" className="form-label ">
										User Name
									</label>
									<input
										type="text"
										className="form-control"
										id="id"
										value={userFirstName+" "+userLastName}
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
										value={userMembership.membershipType}
										disabled
									/>
								</div>
								<div className=" form-group m-3 col-6 mx-auto  ">
									<label className="form-label">Category</label>
									<select className="form-select" id="category" value={chosenMembership} onChange={onMemberShipChooseHandler}>
										<option value="" defaultValue disabled>
											Select a Plan
										</option>
										{
											membershipList.map((item,index)=>(
											<option value={item.id} key={index}>
												{item.membershipType} with {item.discount}% Discount
											</option>))
										}
									</select>
								</div>
								<br />
								{
									showPriceTier && <div className="m-3 col-6 mx-auto  ">
									<div className="input-group mb-3">
										<span className="input-group-text text-muted" id="basic-addon1">
											You Agree To Pay ₹
										</span>
										<input
											type="text"
											className="form-control"
											placeholder="Username"
											aria-label="Username"
											aria-describedby="basic-addon1"
											value={membershipCost}
											disabled
										/>
									</div>
								</div>
								}
								{
									showPriceTier &&
									<div className="text-center col-6 mx-auto m-5">
									<button type="submit" className="btn btn-danger fs-4" onClick={onPayClickHandler}>
										Proceed to Pay &nbsp; <FontAwesomeIcon icon={faCreditCard} />
									</button>
								</div>
								}
								
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UpgradeMembershipComponent;
