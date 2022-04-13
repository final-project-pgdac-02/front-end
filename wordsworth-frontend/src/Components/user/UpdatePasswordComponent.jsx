import React, { useContext } from "react";
import { useEffect, useState } from "react";
import UserService from "../../service/UserService";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../App";


const UpdatePasswordComponent = () => {
	let navigate = useNavigate();
	const { state, dispatch } = useContext(UserContext);
	const [notLoggedIn, setNotLoggedIn] = useState(false);

	const [userId, setUserId] = useState("");
	const [firstName, setFirstName] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const [oldPasswordErr, setOldPasswordErr] = useState("");
	const [newPasswordErr, setNewPasswordErr] = useState("");
	const [confirmNewPasswordErr, setConfirmNewPasswordErr] = useState("");

	let id = window.sessionStorage.getItem("sessionObjectId");
	let name = window.sessionStorage.getItem("sessionObjectFirstName");

	useEffect(() => {
		if (id === null) {
			alert("You need to login to Change Password!");
			setNotLoggedIn(true);
		} else {
			setUserId(id);
			setFirstName(name);
		}
	}, []);


	let oldPasswordTextHandler = (event) => {
		setOldPassword(event.target.value);
		if (oldPasswordErr !== null || oldPasswordErr !== "") {
			setOldPasswordErr("");
		}
		console.log(oldPassword);
	};

	let newPasswordTextHandler = (event) => {
		setNewPassword(event.target.value);
		if (newPasswordErr !== null || newPasswordErr !== "") {
			setNewPasswordErr("");
		}
		console.log(newPassword);
	};

	let confirmNewPasswordTextHandler = (event) => {
		setConfirmNewPassword(event.target.value);
		if (confirmNewPasswordErr !== null || confirmNewPasswordErr !== null) {
			setConfirmNewPasswordErr("");
		}
		console.log(confirmNewPassword);
	};

	let validation = () => {
		let flag = true;

		if (oldPassword === null || oldPassword === "") {
			setOldPasswordErr("This Field is Mandatory");
			flag = false;
		}

		if (newPassword === null || newPassword === "") {
			setNewPasswordErr("This Field Is mandatory");
			flag = false;
		}

		if (confirmNewPassword === null || confirmNewPassword === "") {
			setConfirmNewPasswordErr("This Field is Mandatory");
			flag = false;
		} else if (newPassword !== confirmNewPassword) {
			setConfirmNewPasswordErr("New Password and Confirm New Password should be same");
			flag = false;
		}

		if (flag) {
			return true;
		}
	};
	const LogoutClick = () => {
		window.sessionStorage.removeItem("sessionObjectId");
		window.sessionStorage.removeItem("sessionObjectFirstName");
		window.sessionStorage.removeItem("sessionObjectEmail");
		window.sessionStorage.removeItem("sessionObjectRole");
		dispatch({ type: "USER", payload: "" });
		window.sessionStorage.setItem("snackbar1", "show");
		navigate("/login");
	};

	const OnChangePasswordClick = (event) => {
		event.preventDefault();
		console.log(userId);

		if (validation()) {
			setOldPasswordErr("");
			setNewPasswordErr("");
			setConfirmNewPasswordErr("");

			let passwordObject = { "id":userId, oldPassword, newPassword };
			UserService.updatePassword(passwordObject)
				.then((respose) => {
					window.alert("Password updated successfully!");
					console.log("Password Updated Succefully", respose.data);
					LogoutClick();
				})
				.catch((err) => {
					console.log("Cannot Update the Password", err);
				});
		}
	};

	return (
		<>
			{notLoggedIn && <Navigate to="/login" />}
			<div>
				<br />
				<br />
				<div className="card mx-auto shadow" style={{ width: "45%" }}>
					<div className="row g-0 d-flex flex-wrap align-items-center">
						<div className="card-body">
							<h1 className="card-title display-4 text-center m-1 ">Change Password Form </h1>
							<hr />
						</div>
						<form onSubmit={OnChangePasswordClick}>
							<div className=" col-6 mx-auto m-3 ">
								<label for="name" className="form-label ">
									User Name
								</label>
								<input
									type="text"
									className="form-control"
									id="name"
									aria-describedby="id"
									value={firstName}
									disabled
								/>
								{/* <span className="text-danger">{userIdErr}</span> */}
							</div>
							<div className="m-3 col-6 mx-auto  ">
								<label for="exampleInputPassword1" className="form-label ">
									Old Password
								</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword1"
									placeholder="* * * * * * * * * *"
									onChange={oldPasswordTextHandler}
									value={oldPassword}
								/>
								<span className="text-danger">{oldPasswordErr}</span>
							</div>
							<div className="m-3 col-6 mx-auto  ">
								<label for="exampleInputPassword2" className="form-label ">
									New Password
								</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword2"
									placeholder="* * * * * * * * * *"
									onChange={newPasswordTextHandler}
									value={newPassword}
								/>
								<span className="text-danger">{newPasswordErr}</span>
							</div>
							<div className="m-3 col-6 mx-auto  ">
								<label for="exampleInputPassword2" className="form-label ">
									Confirm New Password
								</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword2"
									placeholder="* * * * * * * * * *"
									onChange={confirmNewPasswordTextHandler}
									value={confirmNewPassword}
								/>
								<span className="text-danger">{confirmNewPasswordErr}</span>
							</div>
							<div className="text-center col-5 mx-auto m-5">
								<button type="submit" className="btn btn-warning btn-lg">
									Update Password &nbsp; <FontAwesomeIcon icon={faPencil} />
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdatePasswordComponent;
