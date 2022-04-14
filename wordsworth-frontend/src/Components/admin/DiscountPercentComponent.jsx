import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { useParams, Navigate } from "react-router-dom";
import MembershipService from "../../service/MembershipService";

const DiscountPercentComponent = () => {

	const [loggedInNotAsAdmin, setLoggedInNotAsAdmin] = useState(false);
	const role = window.sessionStorage.getItem("sessionObjectRole");
	useEffect(() => {
		window.scrollTo(0, 0);
		if (role !== "ADMIN") {
			setLoggedInNotAsAdmin(true);
			alert("Only Admins can edit discount percent!");
		}
	}, []);

	const [percent, setPercent] = useState(0);
    const [percentEdited, setPercentEdited] = useState(false);

	let { id } = useParams();

	const saveDiscountPercentHandler = (e) => {
		e.preventDefault();
        let membershipObject = {
			id: parseInt(id),
			discount: parseInt(percent),
		};
        MembershipService.processSetDiscountPercent(membershipObject).then((response) => {
            alert(response.data);
            setPercentEdited(true);
        }).catch((error)=>{
            console.log("Something Went Wrong, Please try again!");
        })
	};

	return (
		<>
			{percentEdited && <Navigate to="/membership" />}
			{loggedInNotAsAdmin && <Navigate to="/forbidden" />}
			<div>
				<div>
					<br />
					<br />
					<div className="card mx-auto shadow" style={{ width: "40%" }}>
						<div className="card-body">
							<h1 className="card-title display-3 text-center m-1 ">Edit Discount %</h1>
							<hr />
						</div>
						<form onSubmit={saveDiscountPercentHandler}>
							<div className="card-body">
								<div className="d-flex col-3 mx-auto">
									<div className="input-group input-group-lg">
										<span className="input-group-text text-muted" id="inputGroup-sizing-lg">
											%
										</span>
										<input
											type="text"
											className="form-control rounded-end"
											aria-label="Sizing example input"
											aria-describedby="inputGroup-sizing-lg"
											min={0}
											max={100}
											value={percent}
										/>
										<span className="text-danger"></span>
									</div>
								</div>
								<br />
								<div className="d-flex col-10 mx-auto m-5">
									<input
										type="range"
										className="form-range"
										min="0"
										max="100"
										id="customRange2"
										onChange={(e) => setPercent(e.target.value)}
										step={1}
									/>
								</div>
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

export default DiscountPercentComponent;
