import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { useParams, Navigate } from "react-router-dom";
import MembershipService from "../../service/MembershipService";

const MembershipCostComponent = () => {

	const [loggedInNotAsAdmin, setLoggedInNotAsAdmin] = useState(false);
	const role = window.sessionStorage.getItem("sessionObjectRole");
	useEffect(() => {
		window.scrollTo(0, 0);
		if (role !== "ADMIN") {
			setLoggedInNotAsAdmin(true);
			alert("Only Admins can edit membership cost!");
		}
	}, []);

	const [cost, setCost] = useState(0);
    const [costErr, setCostErr] = useState("");
	const [costEdited, setCostEdited] = useState(false);

	let { id } = useParams();

    const membershipCostHandler = (e) => {
        setCost(e.target.value);
        console.log(e.target.value);
        if (costErr !== null || costErr !== "") {
			costErr("");
		}
        setCost(e.target.value);
    }

    const validation = () => {
        let flag = true;
        if(cost === null || cost === ""){
            setCostErr("This field is mandatory")
            flag=false;
        }
        if(flag){
            return true;
        }
    }


	const saveMembershipCostHandler = (e) => {
		e.preventDefault();
        if(validation()){
			let membershipObject = {
				id: parseInt(id),
				membershipCost: parseFloat(cost),
			};

			MembershipService.processSetMembershipCost(membershipObject)
				.then((response) => {
					alert(response.data);
					setCostEdited(true);
				})
				.catch((error) => {
					console.log("Something Went Wrong, Please try again!");
				});
		}
	};

	return (
		<>
			{costEdited && <Navigate to="/membership" />}
			{loggedInNotAsAdmin && <Navigate to="/forbidden" />}
			<div>
				<div>
					<br />
					<br />
					<div className="card mx-auto shadow" style={{ width: "50%" }}>
						<div className="card-body">
							<h1 className="card-title display-3 text-center m-1 ">Edit Membership Cost</h1>
							<hr />
						</div>
						<form onSubmit={saveMembershipCostHandler}>
							<div className="card-body">
								<div className="d-flex col-3 mx-auto">
									<div class="input-group input-group-lg">
										<span class="input-group-text text-muted" id="inputGroup-sizing-lg">
											₹
										</span>
										<input
											type="number"
											class="form-control rounded-end"
											aria-label="Sizing example input"
											aria-describedby="inputGroup-sizing-lg"
											min={0}
											step={0.01}
											value={cost}
											onChange={membershipCostHandler}
										/>
									</div>
								</div>
								<br />
								<p className="text-danger text-center">{costErr}</p>
								<br />
								<div className="text-center mx-auto">
									<button type="submit" className="btn btn-success btn-lg fs-3">
										Save &nbsp;
										<FontAwesomeIcon icon={faFilePen} />
									</button>
								</div>
							</div>
						</form>
						<br />
					</div>
				</div>
			</div>
		</>
	);
};

export default MembershipCostComponent;
