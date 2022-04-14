import React, { useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser, faClipboardUser } from '@fortawesome/free-solid-svg-icons'
import { faKey, faRightFromBracket, faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ImBooks } from 'react-icons/im';
import logo from "../../userprofile.png";
import messi from "../../messi.jpg";

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from '../../App';

import { Card, Col, Offcanvas, Row } from 'react-bootstrap';
import AdminService from '../../service/AdminService';
import UserService from '../../service/UserService';
import OrderDetailsService from '../../service/OrderDetailsService';



const CustomerDashboardComponent = () => {
    const userObject1 = window.sessionStorage.getItem("sessionObjectId");
    const userObject2 = window.sessionStorage.getItem("sessionObjectFirstName");
    const userObject3 = window.sessionStorage.getItem("sessionObjectEmail");
    const userObject4 = window.sessionStorage.getItem("sessionObjectRole");
    const userObject5 = window.sessionStorage.getItem("sessionObjectLastName");

    const [show1, setShow1] = useState("");
    const snackBar = window.sessionStorage.getItem("snackbar");

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const [tSum, setTSum] = useState("");

    // const [animationZoomIn1, setAnimationZoomIn1] = useState();
    // const [animationZoomIn2, setAnimationZoomIn2] = useState();
    // const [animationZoomIn3, setAnimationZoomIn3] = useState();
    // const [animationZoomIn4, setAnimationZoomIn4] = useState();
    // const [animationZoomIn5, setAnimationZoomIn5] = useState();
    // const [animationZoomIn6, setAnimationZoomIn6] = useState();
    // const [animationZoomIn7, setAnimationZoomIn7] = useState();


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

            }, 3000)
            window.sessionStorage.removeItem("snackbar");
        }
    })

    // useEffect(() => {

    // 	AdminService.getAllUserList().then((response) => {
    // 		setAllUsers(response.data);
    // 	}).catch((error) => {
    // 		console.log(error);
    // 	})

    // 	AdminService.viewBookDetails().then((response) => {
    // 		setAllBooks(response.data);
    // 	}).catch((error) => {
    // 		console.log(error);
    // 	})
    // },[])

    const [orderListOfUser, setOrderListOfUser] = useState([]);
    const [totalOrderDetails, setTotalOrderDetails] = useState([]);
    useEffect(() => {
        UserService.getAllOrdersById(userObject1).then((response) => {
            setOrderListOfUser(response.data);

        }).catch((error) => {
            console.log(error);
        });

        OrderDetailsService.getAllOrderDetailsByOrderId(userObject1).then((response) => {
            setTotalOrderDetails(response.data);
        }).catch(error => {
            console.log(error);
        });      

    }, []);

    useEffect(() => {
        let totalSum = 0;
        {
            totalOrderDetails.map((value, key) => {
                totalSum = totalSum + (value.price * value.quantity)
            })
        }
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
    }

    const addACardClick = (event) => {
        event.preventDefault();
        setAddCard(true);
    }

    // const mouseOverAnimation1 = () => {
    // 	setAnimationZoomIn1("fade-up");
    // 	setTimeout(() => {
    // 		setAnimationZoomIn1();
    // 		clearTimeout();
    // 	}, 700)
    // }
    // const mouseOverAnimation2 = () => {
    // 	setAnimationZoomIn2("flip-left");
    // 	setTimeout(() => {
    // 		setAnimationZoomIn2();
    // 		clearTimeout();
    // 	}, 700)
    // }
    // const mouseOverAnimation3 = () => {
    // 	setAnimationZoomIn3("fade-down");
    // 	setTimeout(() => {
    // 		setAnimationZoomIn3();
    // 		clearTimeout();
    // 	}, 700)
    // }
    // const mouseOverAnimation4 = () => {
    // 	setAnimationZoomIn4("flip-right");
    // 	setTimeout(() => {
    // 		setAnimationZoomIn4();
    // 		clearTimeout();
    // 	}, 700)
    // }
    // const mouseOverAnimation5 = () => {
    // 	setAnimationZoomIn5("flip-up");
    // 	setTimeout(() => {
    // 		setAnimationZoomIn5();
    // 		clearTimeout();
    // 	}, 700)
    // }
    // const mouseOverAnimation6 = () => {
    // 	setAnimationZoomIn6("zoom-in");
    // 	setTimeout(() => {
    // 		setAnimationZoomIn6();
    // 		clearTimeout();
    // 	}, 700)
    // }
    // const mouseOverAnimation7 = () => {
    // 	setAnimationZoomIn7("flip-down");
    // 	setTimeout(() => {
    // 		setAnimationZoomIn7();
    // 		clearTimeout();
    // 	}, 700)
    // }

    // const addABookClick = (event) => {
    // 	event.preventDefault();
    // 	setAddBook(true);
    // }

    // const onViewAllUsersClick = (event) => {
    // 	event.preventDefault();
    // 	navigate("/viewAllUsers");
    // }

    const onUpdateUserProfileClick = (event) => {
        event.preventDefault();
        navigate("/updateProfile/" + userObject1);
    }

    // const onViewAllBooksClick = (event) => {
    // 	event.preventDefault();
    // 	navigate("/bookList");
    // }

    // const UpgradeMembershipClick = (event) => {
    // 	event.preventDefault();
    // 	navigate("/membership");
    // }

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
						<img src={logo} className="p-3 d-block mx-auto" alt="book cover" style={{ width: "16%" }} />
					</div>
				</div>
				<div className="row g-0">
					<h1 className="display-5 p-4 text-center text-muted">Welcome Customer, {userObject2}</h1>
				</div>

				<div className="row g-1 container" style={{ "margin-left": "16.5rem" }}>
					<div style={{ "margin-left": "10rem" }} className="m-2 col-3">
						<Card border="info" style={{ width: "18rem" }} className="border-2">
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
						<Card border="danger" style={{ width: "18rem" }} className="border-2">
							<Card.Body>
								<Card.Title className="lead fs-4 text-center">Total Amount Spent</Card.Title>
								<Card.Text className="text-center fs-4 lead">
									{/* {allBooks.length} */}
									{/* {totalOrderDetails.} */}
									{Math.round(tSum)}
								</Card.Text>
							</Card.Body>
						</Card>
					</div>
				</div>

				<br></br>
				<div className="container fs-5 text-muted">
					<div className="row g-4 m-3">
						<div className="col-4">
							<div
								className="p-3 border bg-light rounded"
								onClick={addAnAddressClick}
								style={{ textAlign: "center" }}
							>
								Add an Address &nbsp; <FontAwesomeIcon icon={faBook} />
							</div>
						</div>
						<div className="col-4">
							<div
								className="p-3 border bg-light rounded"
								onClick={updatePasswordClick}
								style={{ textAlign: "center" }}
							>
								Change Password &nbsp; <FontAwesomeIcon icon={faKey} />
							</div>
						</div>
						<div className="col-4">
							<div
								className="p-3 border bg-light rounded"
								onClick={addACardClick}
								style={{ textAlign: "center" }}
							>
								Add a Card &nbsp; <FontAwesomeIcon icon={faUser} />
							</div>
						</div>
						{/* <div className="col-4">
                            <div className="p-3 border bg-light" data-aos={animationZoomIn4} onMouseOver={mouseOverAnimation4} onClick={onViewAllBooksClick} style={{ textAlign: 'center' }}>
                                View All Books &nbsp; < ImBooks />
                            </div>
                        </div>*/}
						<div className="col-4">
							<div
								className="p-3 border bg-light text-center rounded"
								// data-aos={animationZoomIn5}
								// onMouseOver={mouseOverAnimation5}
								// onClick={UpgradeMembershipClick}
								// style={{ textAlign: "center" }}
							>
								Upgrade Membership &nbsp; <FontAwesomeIcon icon={faClipboardUser} />
							</div>
						</div>
						<div className="col-4">
							<div
								className="p-3 border bg-light rounded"
								onClick={handleShow}
								style={{ textAlign: "center" }}
							>
								View Profile &nbsp; <FontAwesomeIcon icon={faUser} />
							</div>
						</div>
						<div className="col-4">
							<div
								className="p-3 border bg-light rounded"
								onClick={LogoutClick}
								style={{ textAlign: "center" }}
							>
								Logout &nbsp; <FontAwesomeIcon icon={faRightFromBracket} />
							</div>
						</div>
						<div className="col-4" style={{ "margin-left": "33.35%" }}>
							<div
								className="p-3 border bg-light rounded text-danger"
								onClick={LogoutClick}
								style={{ textAlign: "center" }}
							>
								Deregister Me &nbsp; <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} />
							</div>
							<br />
						</div>
					</div>
				</div>
			</div>

			{/* chnages now */}

			{/* 
			<div className="card mx-auto shadow" style={{ width: "75%" }}>
				<div className="row g-0 d-flex flex-wrap align-items-center">

					<div className="col">
						<img src={logo} className="p-3 d-block mx-auto" alt="book cover" style={{ width: "16%" }} />
					</div>
				</div>
				<div className="row g-0">
					<h1 className="display-5 p-4 text-center text-muted">Welcome back, {userObject2}</h1>
				</div>
				<div className="row m-3 g-0 d-flex flex-wrap align-items-center">
					<div className="col text-center">
						<button
							type="button"
							className="btn btn-outline-primary btn-lg fs-3 border-5"
							style={{ width: "70%", height: "fit-content" }}
							onClick={addABookClick}

						>
							Add an Book &nbsp; <FontAwesomeIcon icon={faBook} />
						</button>
					</div>

					<div className="col text-center">
						<button
							type="button"
							className="btn btn-outline-warning btn-lg fs-3 border-5 "
							style={{ width: "70%", height: "fit-content" }}
							onClick={updatePasswordClick}
						>
							Change Password &nbsp; <FontAwesomeIcon icon={faKey} />
						</button>
					</div>

					<div className="col text-center">
						<button
							type="button"
							className="btn btn-outline-primary btn-lg fs-3 border-5"
							style={{ width: "70%", height: "fit-content" }}
							onClick={onViewAllUsersClick}

						>
							View All Users &nbsp; <FontAwesomeIcon icon={faUser} />
						</button>
					</div>
					<div className="col text-center">
						<button
							type="button"
							className="btn btn-outline-warning btn-lg fs-3 border-5"
							style={{ width: "70%", height: "fit-content" }}
							onClick={onViewAllBooksClick}

						>
							View All Books &nbsp; < ImBooks />
						</button>
					</div>

					<div className="col text-center">
						<button
							type="button"
							className="btn btn-outline-warning btn-lg fs-3 border-5 "
							style={{ width: "70%", height: "fit-content" }}
							onClick={UpgradeMembershipClick}
						>
							Upgrade Membership &nbsp; <FontAwesomeIcon icon={faClipboardUser} />
						</button>
					</div>
				</div>
				<div className="row m-3 g-0 d-flex flex-wrap align-items-center">
					<div className="col text-center ">

						<button className="btn btn-outline-info btn-lg fs-3 border-5"
							type="button" onClick={handleShow}
						// style={{ width: "40%", height: "fit-content" }}
						// onClick={handleShow}
						>
							View Profile &nbsp; <FontAwesomeIcon icon={faUser} />
						</button>


					</div>
				</div>
				<div className="row m-3 g-0 d-flex flex-wrap align-items-center">
					<div className="col text-center">
						<button
							type="button"
							className="btn btn-outline-danger fs-3 border-5 m-2"
							style={{ width: "50%", height: "fit-content" }}
							onClick={LogoutClick}
						>
							Logout &nbsp; <FontAwesomeIcon icon={faRightFromBracket} />
						</button>
					</div>
					{/* <div className="col text-center">
						<button
							type="button"
							className="btn btn-outline-danger fs-3 border-5 m-2"
							style={{ width: "50%", height: "fit-content" }}
						>
							Deregister Me &nbsp; <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} />
						</button>
					</div> */}

			{/* </div> */}
			{/* </div> */}

			<div className={show1} id="snackbar">
				LogIn Successfull
			</div>
			<div>
				<Offcanvas show={show} onHide={handleClose}>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title></Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<div className="card mx-auto" style={{ width: "22rem" }}>
							<img src={messi} className="card-img-top" alt="..." />
							<ul className="list-group list-group-flush">
								<li className="list-group-item">
									<h5 className="fw-light fs-4">
										NAME : &nbsp;
										{userObject2}&nbsp;{userObject5}
									</h5>
								</li>
								<li className="list-group-item">
									<h5 className="fw-light fs-4">E-MAIL : &nbsp;{userObject3}</h5>
								</li>
								{/* <li className="list-group-item">
									<h5>
										<strong>ROLE : </strong>
										{userObject4}
									</h5>
								</li> */}
								<li className="list-group-item" style={{ textAlign: "center" }}>
									<button
										className="btn btn-primary m-2 fs-4"
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
}






export default CustomerDashboardComponent;