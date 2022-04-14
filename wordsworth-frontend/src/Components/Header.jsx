import React, { useContext, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, Button, FormControl } from "react-bootstrap";
import WordsworthSvgComponent from "./WordsworthSvgComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping, faUser, faHouse } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import AdvancedSearchComponent from "./AdvancedSearchComponent";


const Header = () => {
	let svgprops = {
		opacity: "0.6",
		width: "200",
	};

	const navigate = useNavigate();

	const userId = window.sessionStorage.getItem("sessionObjectId");
	const userObject2 = window.sessionStorage.getItem("sessionObjectFirstName");
	const { state, dispatch } = useContext(UserContext);
	const [searchString, setSearchString] = useState("");


	const onCartClickhandler = () => {
		if (!userId) {
			alert("You need to login to view your cart");
			navigate("/login");
		} else navigate("/usercart");
	};

	const onFormChangeHandler = (event) => {
		// event.preventDefault()
		setSearchString(event.target.value)
		console.log(searchString);
		console.log("in on form change handler: " + searchString);
	}

	const onSearchClickHandler = (e) => {
		e.preventDefault();
		console.log("in on searchClickHandler: " + searchString)
		if (searchString) {
			// setSearch(true);
			navigate(`/search/${searchString}`);
			setSearchString("");
		}
	}


	const LogoutClick = () => {
		window.sessionStorage.removeItem("sessionObjectId");
		window.sessionStorage.removeItem("sessionObjectFirstName");
		window.sessionStorage.removeItem("sessionObjectEmail");
		window.sessionStorage.removeItem("sessionObjectRole");
		dispatch({ type: "USER", payload: "" });
		window.sessionStorage.setItem("snackbar1", "show");
		navigate("/login");
	};

	const LogoutClick2 = () => {
		window.sessionStorage.removeItem("sessionObjectId");
		window.sessionStorage.removeItem("sessionObjectFirstName");
		window.sessionStorage.removeItem("sessionObjectEmail");
		window.sessionStorage.removeItem("sessionObjectRole");
		window.sessionStorage.setItem("snackbar1", "show");
		dispatch({ type: "ADMIN", payload: "" });
		navigate("/login");
	};


	let navbarList1 = [
		{ "to": "/login", "name": "Login" }, { "to": "/registration", "name": "Register" }
	];

	let navbarList2 = [
		{ "to": "/addanaddress", "name": "Add An Address" },
		{ "to": "/addacard", "name": "Add A Card" },
		{ "to": "/changepassword", "name": "Change Password" },
		{ "to": "#action/3.3", "name": "Upgrade Membership" },
		{ "to": "/orderhistory", "name": "View Past Orders" }
	];

	let navbarList3 = [
		{ "to": "/admindashboard", "name": "Dashboard" }
	];


	const RenderDashboard = () => {
		if (state === "user") {
			return (
				<NavLink to="/customerdashboard" className="mx-3 text-decoration-none text-muted">
					{/* <Button variant="light fs-4 text-muted rounded-circle"> */}
					<FontAwesomeIcon icon={faUser} className="mx-auto fs-4" />
					{/* </Button> */}
				</NavLink>
			);
		} else if (state === "admin") {
			return (
			<NavLink to="/admindashboard" className="mx-3 text-decoration-none text-muted">
				{/* <Button variant="light fs-4 text-muted rounded-circle"> */}
				<FontAwesomeIcon icon={faUser} className="mx-auto fs-4" />
				{/* </Button> */}
			</NavLink>
			);
		}
	}

	const RenderMenu = () => {
		if (state === "user") {
			console.log("Hi from USER");
			return (
				<>
					
					<Nav>
						<NavDropdown title={userObject2} id="basic-nav-dropdown" className="fs-5">
							{navbarList2.map((ele, key) => {
								return (

									<NavDropdown.Item ><NavLink to={ele.to} style={{ color: 'grey', textDecoration: 'none' }}>
										{ele.name}
									</NavLink>
									</NavDropdown.Item>
								);
							})}
							<NavDropdown.Divider />
							<NavDropdown.Item className='btn btn-primary' onClick={LogoutClick}>Log Out</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</>
			);

		} if (state === "admin") {
			console.log("Hi from ADMIN");
			return (
				<>
					<Nav>
						<NavDropdown title={userObject2} id="basic-nav-dropdown" className="fs-5">
							{navbarList3.map((ele, key) => {
								return (
									<NavDropdown.Item>
										<NavLink to={ele.to} style={{ color: "grey", textDecoration: "none" }}>
											{ele.name}
										</NavLink>
									</NavDropdown.Item>
								);
							})}
							<NavDropdown.Divider />
							<NavDropdown.Item className="btn btn-primary" onClick={LogoutClick2}>
								Log Out
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</>
			);
		} else {
			console.log("Hi from LOG OUT");
			return (
				<>
					<Nav>
						<Nav>
							<NavLink to="/login" className="fs-5 mx-3 text-decoration-none text-muted">
								Login
							</NavLink>
						</Nav>
						<Nav>
							<NavLink to="/registration" className="fs-5 mx-3 text-decoration-none text-muted">
								Register
							</NavLink>
						</Nav>
						{/* <NavDropdown title={userObject2} id="basic-nav-dropdown">
							{navbarList1.map((ele, key) => {
								return (
									<NavDropdown.Item ><NavLink to={ele.to} style={{ color: 'grey', textDecoration: 'none' }}>
										{ele.name}
									</NavLink>
									</NavDropdown.Item>
								);
							})}

						</NavDropdown> */}
					</Nav>
				</>
			);
		}
	}

	return (
		<Navbar bg="light" expand="lg" className="sticky-top">
			<Container>
				<Navbar.Brand>
					<NavLink to="/">
						<WordsworthSvgComponent {...svgprops} />
					</NavLink>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto align-items-center">
						<NavLink to="/" className="mx-3 text-decoration-none text-muted">
							{/* <Button variant="light fs-4 text-muted rounded-circle"> */}
							<FontAwesomeIcon icon={faHouse} className="mx-auto fs-4" />
							{/* </Button> */}
						</NavLink>
						{/* <NavLink to="/userdashboard" className="mx-3 text-decoration-none text-muted">
							Dashboard
						</NavLink> */}



						{/* <NavLink to="/userdashboard" className="mx-3 text-decoration-none text-muted">
							{/* <Button variant="light fs-4 text-muted rounded-circle"> */}
						{/* <FontAwesomeIcon icon={faUser} className="mx-auto fs-4" /> */}
						{/* </Button> */}
						{/* </NavLink> */}
						<RenderDashboard/>

						<NavLink to="#" className="mx-3 text-decoration-none text-muted">
							<AdvancedSearchComponent />
							{/* <FontAwesomeIcon icon={faUser} className="mx-auto fs-4" /> */}
							{/* </Button> */}
						</NavLink>

						{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown> */}
						{/* <Nav.Link align="left" href="#link">Link</Nav.Link> */}
					</Nav>
					<div className="mx-auto">
						{/* <Form className="d-flex" onSubmit={()=>navigate(`/search/${searchString}`)}> */}
						<Form className="d-flex" onSubmit={onSearchClickHandler}>
							<FormControl
								type="search"
								placeholder="Search for your next favourite book here!"
								className="me-2 text-center rounded-pill"
								aria-label="Search"
								value={searchString}
								onChange={onFormChangeHandler}
								style={{ width: "30em" }}
							/>
							<Button variant="light fs-4 text-muted rounded-circle" onClick={onSearchClickHandler}>
								<FontAwesomeIcon icon={faMagnifyingGlass} className="mx-auto" />
							</Button>
						</Form>
					</div>
					{/* <Nav>
						<NavLink to="/login" className="fs-5 mx-3 text-decoration-none text-muted">
							Login
						</NavLink>
					</Nav> */}
					{/* <Nav>
						<NavLink to="/registration" className="fs-5 mx-3 text-decoration-none text-muted">
							Register
						</NavLink>
					</Nav> */}



					<RenderMenu />
					<Nav>
						<Nav.Link eventKey={2} className="fs-4 text-muted">
							{/* <FontAwesomeIcon icon={faCartShopping} className="mx-auto" onClick={onCartClickhandler} /> */}
							{/* <Button variant="light fs-4 text-muted rounded-circle"> */}
							<FontAwesomeIcon
								icon={faCartShopping}
								className="mx-auto"
								onClick={onCartClickhandler}
							/>
							{/* </Button> */}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
