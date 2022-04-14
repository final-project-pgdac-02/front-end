import React, { useEffect, useState } from "react";
import MembershipComponent from "./MembershipComponent";
import axios from "axios";
import { Navigate } from "react-router-dom";

const MembershipDashboardComponent = () => {
	const [loggedInNotAsAdmin, setLoggedInNotAsAdmin] = useState(false);
	const role = window.sessionStorage.getItem("sessionObjectRole");
	useEffect(() => {
		window.scrollTo(0, 0);
		if (role !== "ADMIN") {
			setLoggedInNotAsAdmin(true);
			alert("Only Admins can access membership dashboard!");
		} else {
			getMembershipList();
		}
	}, []);

	const [loading, setLoading] = useState(false);
	const [membershipList, setMembershipList] = useState([]);
	const getMembershipList = async () => {
		try {
			const res = await axios.get("http://localhost:8080/memberships/");
			setMembershipList(res.data);
			setLoading(true);
		} catch (err) {
			alert(err);
		}
	};

	return (
		<>
			{loggedInNotAsAdmin && <Navigate to="/forbidden" />}

			<div>
				<br />
				<br />
				<div className="card mx-auto shadow" style={{ width: "90%" }}>
					<div className="card-body">
						<h1 className="card-title display-3 text-center m-1 ">Membership Dashboard</h1>
						<hr />
					</div>
					<div className="row  row-cols-3 g-4 card-body d-flex mx-auto justify-content-center">
						{loading &&
							membershipList.map((membership, i) => (
								<MembershipComponent key={i} membership={membership} />
							))}
					</div>
					<br />
				</div>
			</div>
		</>
	);
};

export default MembershipDashboardComponent;
