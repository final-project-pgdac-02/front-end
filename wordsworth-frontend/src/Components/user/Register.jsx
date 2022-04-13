import { useState } from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import UserService from "../../service/UserService";
import CarouselComponent from "./CarouselComponent";

const Register = () => {
	const [registrationDone, setRegistrationDone] = useState(false);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const [role, setRole] = useState("CUSTOMER");

	const [firstNameErr, setFirstNameErr] = useState("");
	const [lastrNameErr, setLastNameErr] = useState("");
	const [emailErr, setEmailErr] = useState("");
	const [confirmEmailErr, setConfirmEmailErr] = useState("");
	const [passwordErr, setPasswordErr] = useState("");
	const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
	const [phoneNumberErr, setPhoneNumberErr] = useState("");

	let firstNameTextHandler = (event) => {
		setFirstName(event.target.value);
		console.log(firstName);
	};

	let lastNameTextHandler = (event) => {
		setLastName(event.target.value);
		console.log(lastName);
	};

	let emailTextHandler = (event) => {
		setEmail(event.target.value);
		console.log(email);
	};

	let confirmEmailTextHandler = (event) => {
		setConfirmEmail(event.target.value);
		console.log(confirmEmail);
	};

	let passwordTextHandler = (event) => {
		setPassword(event.target.value);
		console.log(password);
	};

	let confirmPasswordTextHandler = (event) => {
		setConfirmPassword(event.target.value);
		console.log(confirmEmail);
	};

	let phoneNumberTextHandler = (event) => {
		setPhoneNumber(event.target.value);
		console.log(phoneNumber);
	};

	let validation = () => {
		let flag = true;

		if (firstName === null || firstName === "") {
			setFirstNameErr("This Field is Mandatory");
			flag = false;
		}

		if (lastName === null || lastName === "") {
			setLastNameErr("This Field is Mandatory");
			flag = false;
		}

		if (email === null || email === "") {
			setEmailErr("This Field is Mandatory");
			flag = false;
		}

		if (confirmEmail === null || confirmEmail === "") {
			setConfirmEmailErr("This Field is Mandatory");
			flag = false;
		} else if (email !== confirmEmail) {
			setConfirmEmailErr("Email and Confirm Email Don't Match");
			flag = false;
		}

		if (password === null || password === "") {
			setPasswordErr("This Field is Mandatory");
			flag = false;
		}

		if (confirmPassword === null || confirmPassword === "") {
			setConfirmPasswordErr("This Field is Mandatory");
			flag = false;
		} else if (password !== confirmPassword) {
			setConfirmPasswordErr("Password and Confirm Password Don't Match");
		}

		if (phoneNumber === null || phoneNumber === "") {
			setPhoneNumberErr("This Field is Mandatory");
			flag = false;
		}

		if (flag) {
			return true;
		}
	};

	let OnRegisterClick = (e) => {
		e.preventDefault();

		if (validation()) {
			setFirstNameErr("");
			setLastNameErr("");
			setEmailErr("");
			setConfirmEmailErr("");
			setPasswordErr("");
			setConfirmPasswordErr("");
			setPhoneNumberErr("");

			let userObject = { firstName, lastName, email, password, phone: phoneNumber, role };
			window.sessionStorage.setItem("snackbar2","show");


			UserService.processRegisterForm(userObject)
				.then((response) => {
                    window.alert("Registered Successfully!");
					// console.log("Register successfully", response.data);
					setRegistrationDone(true);
				})
				.catch((err) => {
					console.log("Something went wrong", err);
				});
		}
	};

	return (
		<>
			{registrationDone && <Navigate to="/login" />}
			<div className="card m-5 shadow" style={{ width: "90rem" }}>
				<div className="row g-0 d-flex flex-wrap align-items-center">
					<div className="col-4">
						{/* <img
							src="https://images.fineartamerica.com/images-medium-large-5/sherlock-holmes-book-cover-poster-art-1-nishanth-gopinathan.jpg"
							className="img-fluid p-3"
							alt="book cover"
						/> */}
						<CarouselComponent />
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h1 className="card-title display-4 text-center m-1 ">Register Now </h1>
							<hr />
						</div>
						<form className="row g-4 d-flex justify-content-around" onSubmit={OnRegisterClick}>
							<div className="col-5">
								<label htmlFor="fname" className="form-label">
									First Name
								</label>
								<input
									type="text"
									className="form-control fst-italic"
									id="fname"
									placeholder="William"
									onChange={firstNameTextHandler}
									value={firstName}
								/>
								<span className="text-danger">{firstNameErr}</span>
							</div>
							<div className="col-5">
								<label htmlFor="lname" className="form-label">
									Last Name
								</label>
								<input
									type="text"
									className="form-control fst-italic"
									id="lname"
									placeholder="Wordsworth"
									onChange={lastNameTextHandler}
									value={lastName}
								/>
								<span className="text-danger">{lastrNameErr}</span>
							</div>
							<div className="col-5">
								<label htmlFor="em" className="form-label">
									Email Address
								</label>
								<input
									type="email"
									className="form-control fst-italic"
									placeholder="will.worth@gmail.com"
									id="em"
									onChange={emailTextHandler}
									value={email}
								/>
								<span className="text-danger">{emailErr}</span>
							</div>
							<div className="col-5">
								<label htmlFor="cem" className="form-label">
									Confirm Email Address
								</label>
								<input
									type="email"
									className="form-control fst-italic"
									placeholder="will.worth@gmail.com"
									id="cem"
									onChange={confirmEmailTextHandler}
									value={confirmEmail}
								/>
								<span className="text-danger">{confirmEmailErr}</span>
							</div>
							<div className="col-5">
								<label htmlFor="pass" className="form-label">
									Password
								</label>
								<input
									type="password"
									className="form-control"
									placeholder="* * * * * * * * * *"
									id="pass"
									onChange={passwordTextHandler}
									value={password}
								/>
								<span className="text-danger">{passwordErr}</span>
							</div>
							<div className="col-5">
								<label htmlFor="cpass" className="form-label">
									Confirm Password
								</label>
								<input
									type="password"
									className="form-control"
									placeholder="* * * * * * * * * *"
									id="cpass"
									onChange={confirmPasswordTextHandler}
									value={confirmPassword}
								/>
								<span className="text-danger">{confirmPasswordErr}</span>
							</div>
							<div className="col-3">
								<label htmlFor="phn" className="form-label">
									Phone Number
								</label>
								<input
									type="tel"
									className="form-control"
									id="phn"
									placeholder="9797979797"
									onChange={phoneNumberTextHandler}
									value={phoneNumber}
								/>
								<span className="text-danger">{phoneNumberErr}</span>
							</div>
							<input
								type="hidden"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Role"
								value={role}
							/>

							<div className="text-center m-4">
								<button type="submit" className="btn btn-danger">
									<h5 className="fs-3 fw-light">
										Register &nbsp; <FontAwesomeIcon icon={faUserPlus} />
									</h5>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
