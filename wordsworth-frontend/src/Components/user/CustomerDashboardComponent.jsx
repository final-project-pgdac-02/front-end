import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser, faClipboardUser, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import {
	faKey,
	faRightFromBracket,
	faPersonWalkingDashedLineArrowRight,
	faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../userprofile.png";
// import messi from "../../messi.jpg";

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

import { Card, Offcanvas } from "react-bootstrap";
import AdminService from "../../service/AdminService";
import UserService from "../../service/UserService";
import OrderDetailsService from "../../service/OrderDetailsService";
import DeleteConfirmation from "../admin/DeleteConfirmation";

const CustomerDashboardComponent = () => {
	const userObject1 = window.sessionStorage.getItem("sessionObjectId");
	const userObject2 = window.sessionStorage.getItem("sessionObjectFirstName");
	const userObject3 = window.sessionStorage.getItem("sessionObjectEmail");
	const userObject4 = window.sessionStorage.getItem("sessionObjectRole");
	const userObject5 = window.sessionStorage.getItem("sessionObjectLastName");

	const [show1, setShow1] = useState("");
	const snackBar = window.sessionStorage.getItem("snackbar");
	const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);

	const navigate = useNavigate();

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [tSum, setTSum] = useState("");
	const [userId, setUserId] = useState("");

	const [loggedInAsCustomer, setLoggedInAsCustomer] = useState(false);
	const [loginFalse, setLoginFalse] = useState(false);
	const [updatePassword, setUpdatePassword] = useState(false);
	const [logout, setLogout] = useState(false);
	const [addAddress, setAddAddress] = useState(false);
	const [addCard, setAddCard] = useState(false);
	const { state, dispatch } = useContext(UserContext);

	useEffect(() => {
		if (userObject1 === null || userObject2 === null || userObject3 === null || userObject4 === null) {
			setLoginFalse(true);
		}
	});

	useEffect(() => {
		if (userObject4 === "CUSTOMER") {
			setLoggedInAsCustomer(true);
			navigate("/customerdashboard");
		} else {
			navigate("/");
		}
	}, []);

	useEffect(() => {
		// window.scrollTo(0, 0);

		if (snackBar === "show") {
			console.log(snackBar);
			setShow1(snackBar);
			setTimeout(function () {
				setShow1("");
				clearTimeout();
			}, 3000);
			window.sessionStorage.removeItem("snackbar");
		}
	});

	const [orderListOfUser, setOrderListOfUser] = useState([]);
	const [totalOrderDetails, setTotalOrderDetails] = useState([]);
	useEffect(() => {
		UserService.getAllOrdersById(userObject1)
			.then((response) => {
				setOrderListOfUser(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		OrderDetailsService.getAllOrderDetailsByOrderId(userObject1)
			.then((response) => {
				setTotalOrderDetails(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		// let totalSum = 0;
		// totalOrderDetails.map((value, key) => {
		// 	totalSum = totalSum + value.price * value.quantity;
		// });
		let totalSum = 0;
		totalOrderDetails.map((value, key) => {
			totalSum =
				totalSum +
				(Math.ceil((parseFloat(value.price) - parseFloat(value.discountedPrice)) * 100) / 100) * value.quantity;
		});
		setTSum(totalSum);
	});

	const LogoutClick = (event) => {
		event.preventDefault();
		window.sessionStorage.removeItem("sessionObjectId");
		window.sessionStorage.removeItem("sessionObjectFirstName");
		window.sessionStorage.removeItem("sessionObjectEmail");
		window.sessionStorage.removeItem("sessionObjectRole");
		window.sessionStorage.removeItem("sessionObjectLastName");
		window.sessionStorage.setItem("snackbar1", "show");

		setLogout(true);
		dispatch({ type: "USER", payload: false });
	};

	const updatePasswordClick = (event) => {
		event.preventDefault();
		setUpdatePassword(true);
	};

	const addAnAddressClick = (event) => {
		event.preventDefault();
		setAddAddress(true);
	};

	const addACardClick = (event) => {
		event.preventDefault();
		setAddCard(true);
	};

	const onUpdateUserProfileClick = (event) => {
		event.preventDefault();
		navigate("/updateProfile/" + userObject1);
	};

	const onDeleteAUserClick = (id) => {
		AdminService.deleteAUser(id)
			.then((response) => {
				window.sessionStorage.removeItem("sessionObjectId");
				window.sessionStorage.removeItem("sessionObjectFirstName");
				window.sessionStorage.removeItem("sessionObjectEmail");
				window.sessionStorage.removeItem("sessionObjectRole");
				window.sessionStorage.removeItem("sessionObjectLastName");
				window.sessionStorage.setItem("snackbar1", "show");
				dispatch({ type: "USER", payload: false });
				setLogout(true);
			})
			.catch((error) => {
				console.log(error);
			});
		setDisplayConfirmationModal(false);
		navigate("/login");
	};
	const showDeleteModal = (uId) => {
		setUserId(userObject1);

		setDisplayConfirmationModal(true);
	};

	const hideConfirmationModal = () => {
		setDisplayConfirmationModal(false);
	};

	function MouseOver(event) {
		event.target.style.background = "linear-gradient(60deg, #e3ffe7 0%, #d9e7ff 100%)";
		event.target.style.cursor = "pointer";
	}
	function MouseOut(event) {
		event.target.style.background = "";
	}

	return (
		<>
			{loginFalse && <Navigate to="/login" />}
			{logout && <Navigate to="/login" />}
			{updatePassword && <Navigate to="/changepassword" />}
			{addAddress && <Navigate to="/addanaddress" />}
			{addCard && <Navigate to="/addacard" />}
			{/* {addBook && <Navigate to="/addNewBook" />} */}
			{/* {viewProfile && <Navigate to="/"/>} */}
			<br />
			<br />

			<div className="card mx-auto shadow" style={{ width: "75%" }}>
				<div className="row g-0 d-flex flex-wrap align-items-center">
					<div className="col">
						<img src={logo} className="p-3 d-block mx-auto" alt="user icon" style={{ width: "16%" }} />
					</div>
				</div>
				<div className="row g-0">
					<h1 className="display-5 p-4 text-center text-muted">Welcome Customer, {userObject2}</h1>
				</div>

				<div className="row g-1 container" style={{ "margin-left": "16.5rem" }}>
					<div style={{ "margin-left": "10rem" }} className="m-2 col-3">
						<Card border="danger" style={{ width: "18rem" }} className="border-2">
							<Card.Body>
								<Card.Title className="lead fs-4 text-center">Total Orders</Card.Title>
								<Card.Text className="text-center fs-4 lead">
									{/* {allUsers.length} */}
									{orderListOfUser.length}
								</Card.Text>
							</Card.Body>
						</Card>
					</div>

					<div style={{ "margin-left": "10rem" }} className="m-2 col-3">
						<Card border="success" style={{ width: "18rem" }} className="border-2">
							<Card.Body>
								<Card.Title className="lead fs-4 text-center">Total Amount Saved</Card.Title>
								<Card.Text className="text-center fs-4 lead">??? {Math.round(tSum)}</Card.Text>
							</Card.Body>
						</Card>
					</div>
				</div>

				<br></br>
				<div className="container fs-5 text-muted text-center">
					<div className="row g-4 m-3">
						<div className="col-4">
							<div
								className="p-3 border bg-light rounded text-center"
								onClick={addAnAddressClick}
								onMouseEnter={MouseOver}
								onMouseLeave={MouseOut}
							>
								Add an Address &nbsp; <FontAwesomeIcon icon={faBook} />
							</div>
						</div>
						<div className="col-4">
							<div
								className="p-3 border bg-light rounded text-center"
								onClick={updatePasswordClick}
								onMouseEnter={MouseOver}
								onMouseLeave={MouseOut}
							>
								Change Password &nbsp; <FontAwesomeIcon icon={faKey} />
							</div>
						</div>
						<div className="col-4">
							<div
								className="p-3 border bg-light rounded"
								onClick={addACardClick}
								onMouseEnter={MouseOver}
								onMouseLeave={MouseOut}
							>
								Add a Card &nbsp; <FontAwesomeIcon icon={faCreditCard} />
							</div>
						</div>

						<div className="col-4">
							<div
								className="p-3 border bg-light text-center rounded"
								onClick={() => navigate("/upgrademembership")}
								onMouseEnter={MouseOver}
								onMouseLeave={MouseOut}
							>
								Upgrade Membership &nbsp; <FontAwesomeIcon icon={faClipboardUser} />
							</div>
						</div>
						<div className="col-4">
							<div
								className="p-3 border bg-light rounded"
								onClick={handleShow}
								onMouseEnter={MouseOver}
								onMouseLeave={MouseOut}
							>
								View Profile &nbsp; <FontAwesomeIcon icon={faUser} />
							</div>
						</div>
						<div className="col-4">
							<div
								className="p-3 border bg-light rounded"
								onClick={LogoutClick}
								onMouseEnter={MouseOver}
								onMouseLeave={MouseOut}
							>
								Logout &nbsp; <FontAwesomeIcon icon={faRightFromBracket} />
							</div>
						</div>

						<div className="col-4" style={{ "margin-left": "33.35%" }}>
							<div
								className="p-3 border bg-light rounded"
								onClick={() => navigate("/orderhistory")}
								onMouseEnter={MouseOver}
								onMouseLeave={MouseOut}
							>
								View Past Orders &nbsp; <FontAwesomeIcon icon={faClockRotateLeft} />
							</div>
							<br />
						</div>

						<div className="col-4 mx-auto">
							<div
								className="p-3 border bg-light rounded text-danger"
								onClick={() => showDeleteModal(userObject1)}
								style={{ cursor: "pointer" }}
							>
								Deregister Me &nbsp; <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} />
							</div>
							<br />
						</div>
					</div>
				</div>
				<DeleteConfirmation
					showModal={displayConfirmationModal}
					confirmModal={onDeleteAUserClick}
					hideModal={hideConfirmationModal}
					UID={userId}
				/>
			</div>

			<div className={show1} id="snackbar">
				Login Successful
			</div>
			<div>
				<Offcanvas show={show} onHide={handleClose}>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title></Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<div className="card mx-auto" style={{ width: "22rem" }}>
							{/* <img src={messi} className="card-img-top" alt="..." /> */}
							<ul className="list-group list-group-flush">
								<li className="list-group-item">
									<h5 className="fw-light fs-4">
										Name : &nbsp;
										{userObject2}&nbsp;{userObject5}
									</h5>
								</li>
								<li className="list-group-item">
									<h5 className="fw-light fs-4">E-Mail : &nbsp;{userObject3}</h5>
								</li>

								<li className="list-group-item" style={{ textAlign: "center" }}>
									<button
										className="btn btn-primary m-2 fs-5"
										type="button"
										onClick={onUpdateUserProfileClick}
									>
										Update Profile
									</button>
								</li>
							</ul>
						</div>
					</Offcanvas.Body>
				</Offcanvas>
			</div>
		</>
	);
};

export default CustomerDashboardComponent;
