import React,{useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { useParams, Navigate } from "react-router-dom";
import MembershipService from "../../service/MembershipService";



const DiscountStatusComponent = () => {

    const [status, setStatus] = useState("Inactive");
    const [value,setValue] = useState(false);
    const [loggedInNotAsAdmin, setLoggedInNotAsAdmin] = useState(false);
	const role = window.sessionStorage.getItem("sessionObjectRole");
	useEffect(() => {
		window.scrollTo(0, 0);
		if (role !== "ADMIN") {
			setLoggedInNotAsAdmin(true);
			alert("Only Admins can edit discount status!");
		}
	}, []);

    const [statusEdited, setStatusEdited] = useState(false);
    let { id } = useParams();

    const changeHandler = () => {
        if(value){
            setStatus("Inactive");
        }
        else{
            setStatus("Active");
        }
        console.log(value);
    }


    const saveDiscountStatusHandler =  (e) => {
        e.preventDefault();
        let membershipObject = {
			id: parseInt(id),
			discountIsActive: value,
		};
		MembershipService.processSetDiscountStatus(membershipObject)
			.then((response) => {
				alert(response.data);
				setStatusEdited(true);
			})
			.catch((error) => {
				console.log("Something Went Wrong, Please try again!");
			});
    }

	return (
		<>
			{statusEdited && <Navigate to="/membership" />}
			{loggedInNotAsAdmin && <Navigate to="/forbidden" />}
			<div>
				<div>
					<br />
					<br />
					<div className="card mx-auto shadow" style={{ width: "45%" }}>
						<div className="card-body">
							<h1 className="card-title display-3 text-center m-1 ">Edit Discount Status</h1>
							<hr />
						</div>
						<form onSubmit={saveDiscountStatusHandler}>
							<div className="display-4 card-body">
								<div className="d-flex">
									<div className="form-check form-switch mx-auto">
										<label
											className={
												value
													? "form-check-label text-success fw-bold"
													: "form-check-label text-danger  fw-bold"
											}
											htmlFor="flexSwitchCheckDefault"
										>
											{status}
										</label>
										<input
											className="form-check-input"
											type="checkbox"
											role="switch"
											id="flexSwitchCheckDefault"
											onChange={() => {
												setValue(!value);
												changeHandler();
											}}
										/>
									</div>
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

export default DiscountStatusComponent;
