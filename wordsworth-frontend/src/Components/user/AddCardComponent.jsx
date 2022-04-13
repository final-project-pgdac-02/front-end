import React from 'react'
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserService from "../../service/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

const AddCardComponent = () => {
	let navigate = useNavigate();
	const [notLoggedIn, setNotLoggedIn] = useState(false);

	const [userId, setUserId] = useState("");
	const [firstName, setFirstName] = useState("");
	const [cardHolderName, setCardHolderName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [type, setType] = useState("");
	const [expiryDate, setExpiryDate] = useState("");

	const [cardHolderNameErr, setCardHolderNameErr] = useState("");
	const [cardNumberErr, setCardNumberErr] = useState("");
	const [typeErr, setTypeErr] = useState("");
	const [expiryDateErr, setExpiryDateErr] = useState("");

	let id = window.sessionStorage.getItem("sessionObjectId");
	let name = window.sessionStorage.getItem("sessionObjectFirstName");

	useEffect(() => {
        if (id === null) {
            alert("You need to login to Add A Card!");
            setNotLoggedIn(true);
        } else {
        }
    }, []);

	useEffect(() => {
		setUserId(id);
		setFirstName(name);
	}, []);


	let cardHolderNameTextHandler = (event) => {
		setCardHolderName(event.target.value);
		if (cardHolderNameErr !== null || cardHolderNameErr !== "") {
			setCardHolderNameErr("");
		}
		// console.log(cardHolderName);
	};

	let cardNumberTextHandler = (event) => {
		setCardNumber(event.target.value);
		if (cardNumberErr !== null || cardNumberErr !== "") {
			setCardNumberErr("");
		}
		// console.log(cardNumber);
	};

	let cardTypeTextHandler = (event) => {
		setType(event.target.value);
		// console.log(type);
		if (typeErr !== null || typeErr !== "") {
			setTypeErr("");
		}
		
	};

	let expiryDateTextHandler = (event) => {
		setExpiryDate(event.target.value);
		if (expiryDateErr !== null || expiryDateErr !== "") {
			setExpiryDateErr("");
		}
		// console.log(expiryDate);
	};

	let validation = () => {
		let flag = true;

		if (cardHolderName === null || cardHolderName === "") {
			setCardHolderNameErr("This Field is Mandatory");
			flag = false;
		}

		if (cardNumber === null || cardNumber === "") {
			setCardNumberErr("This Field is Mandatory");
			flag = false;
		}

		if (type === null || type === "") {
			setTypeErr("This Field is Mandatory");
			flag = false;
		}

		if (expiryDate === null || expiryDate === "") {
			setExpiryDateErr("This Field is Mandatory");
			flag = false;
		}

		if (flag) {
			return true;
		}
	};

	const OnAddACardClick = (event) => {
		event.preventDefault();

		if (validation()) {
			setCardHolderNameErr("");
			setCardNumberErr("");
			setTypeErr("");
			setExpiryDateErr("");

			let cardObject = { cardHolderName, cardNumber, type, expiryDate };
			UserService.addACard(userId, cardObject)
				.then((respose) => {
					window.alert("Card Added successfully!");
					console.log("card added successfully!!!", respose.data);
					navigate("/");
				})
				.catch((err) => {
					console.error("failed to add card!!!", err);
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
							<h1 className="card-title display-4 text-center m-1 ">Add a New Card </h1>
							<hr />
						</div>
						<form onSubmit={OnAddACardClick}>
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
							</div>
							<div className="m-3 col-6 mx-auto  ">
								<label for="holder" className="form-label ">
									Card Holder Name
								</label>
								<input
									type="text"
									className="form-control"
									id="holder"
									placeholder="William Wordsworth"
									onChange={cardHolderNameTextHandler}
									value={cardHolderName}
								/>
								<span className="text-danger">{cardHolderNameErr}</span>
							</div>
							<div className="m-3 col-6 mx-auto  ">
								<label for="number" className="form-label ">
									Card Number
								</label>
								<input
									type="text"
									className="form-control"
									id="number"
									placeholder="4111 - 1111 - 1111 - 1111"
									onChange={cardNumberTextHandler}
									value={cardNumber}
								/>
								<span className="text-danger">{cardNumberErr}</span>
							</div>
							<div className="m-3 col-6 mx-auto">
								<label for="card_type" className="form-label ">
									Card Type
								</label>
								<select class="form-select" id="card_type" onChange={cardTypeTextHandler} value={type}>
									<option value="" selected disabled>
										Choose a Card Type
									</option>
									<option value="VISA">VISA</option>
									<option value="MASTERCARD">MASTERCARD</option>
									<option value="MAESTRO">MAESTRO</option>
								</select>
								<span className="text-danger">{typeErr}</span>
							</div>
							<div className="m-3 col-6 mx-auto  ">
								<label for="exp" className="form-label ">
									Expiry Date
								</label>
								<input
									type="date"
									className="form-control"
									id="exp"
									onChange={expiryDateTextHandler}
									value={expiryDate}
								/>
								<span className="text-danger">{expiryDateErr}</span>
							</div>
							<div className="text-center col-5 mx-auto m-5">
								<button type="submit" className="btn btn-warning btn-lg">
									Save This Card &nbsp; <FontAwesomeIcon icon={faCreditCard} />
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddCardComponent