import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserService from "../../service/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

const AddAddressComponent = () => {
	const [userId, setUserId] = useState("");
	const [addressName, setAddressName] = useState("");
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [detailedAddress, setDetailedAddress] = useState("");
	const [pinCode, setPinCode] = useState("");
	const [state, setState] = useState("");

	const [userIdErr, setUserIdErr] = useState("");
	const [addressNameErr, setAddressNameErr] = useState("");
	const [cityErr, setCityErr] = useState("");
	const [countryErr, setCountryErr] = useState("");
	const [detailedAddressErr, setDetailedAddressErr] = useState("");
	const [pinCodeErr, setPinCodeErr] = useState("");
	const [stateErr, setStateErr] = useState("");

	const [addAnAddressDone, setAddAnAddressDone] = useState(false);

	let id = window.sessionStorage.getItem("sessionObjectId");
	useEffect(() => {
		setUserId(id);
	}, [id]);


    let userIdTextHandler = (event) => {
		setUserId(event.target.value);
		if (userIdErr !== null || userIdErr !== "") {
			setUserIdErr("");
		}
		console.log(userId);
	};

	let addressNameTextHandler = (event) => {
		setAddressName(event.target.value);
		if (addressNameErr !== null || addressNameErr !== "") {
			setAddressNameErr("");
		}
		console.log(addressName);
	};

	let cityTextHandler = (event) => {
		setCity(event.target.value);
		if (cityErr !== null || cityErr !== "") {
			setCityErr("");
		}
		console.log(city);
	};

	let countryTextHandler = (event) => {
		setCountry(event.target.value);
		if (countryErr !== null || countryErr !== "") {
			setCountryErr("");
		}
		console.log(country);
	};

	let detailedAddressTextHandler = (event) => {
		setDetailedAddress(event.target.value);
		if (detailedAddressErr !== null || detailedAddressErr !== "") {
			setDetailedAddressErr("");
		}
		console.log(detailedAddress);
	};

	let pinCodeTextHandler = (event) => {
		setPinCode(event.target.value);
		if (pinCodeErr !== null || pinCodeErr !== "") {
			setPinCodeErr("");
		}
		console.log(pinCode);
	};

	let stateTextHandler = (event) => {
		setState(event.target.value);
		if (state !== null || state !== "") {
			setStateErr("");
		}
		console.log(state);
	};

	let validation = () => {
		let flag = true;

		if (userId === null || userId === "") {
			setUserIdErr("This Field is Mandatory");
			flag = false;
		}

		if (addressName === null || addressName === "") {
			setAddressNameErr("This Field is Mandatory");
			flag = false;
		}

		if (city === null || city === "") {
			setCityErr("This Field Is mandatory");
			flag = false;
		}

		if (country === null || country === "") {
			setCountryErr("This Field is Mandatory");
			flag = false;
		}

		if (detailedAddress === null || detailedAddress === "") {
			setDetailedAddressErr("This Field is Mandatory");
			flag = false;
		}

		if (pinCode === null || pinCode === "") {
			setPinCodeErr("This Field is Mandatory");
			flag = false;
		}

		if (state === null || state === "") {
			setStateErr("This Field is Mandatory");
			flag = false;
		}

		if (flag) {
			return true;
		}
	};

	const OnAddAnAddressClick = (event) => {
		event.preventDefault();

		if (validation()) {
			setUserIdErr("");
			setAddressNameErr("");
			setCityErr("");
			setCountryErr("");
			setDetailedAddressErr("");
			setPinCode("");
			setStateErr("");

			let addressObject = { detailedAddress, city, addressName, state, country, pinCode };
			UserService.addAnAddress(userId, addressObject)
				.then((respose) => {
					window.alert("Address Added successfully!");
					console.log("Address Added Succefully", respose.data);
					setAddAnAddressDone(true);
				})
				.catch((err) => {
					console.log("Failed To Add The Address!!!", err);
				});
		}
	};  

	return (
		<>
			{addAnAddressDone && <Navigate to="/" />}
			<div>
				<br />
				<br />
				<div className="card mx-auto shadow" style={{ width: "50%" }}>
					<div className="row g-0 d-flex flex-wrap align-items-center">
						<div className="card-body">
							<h1 className="card-title display-4 text-center m-1 ">Add a New Address </h1>
							<hr />
						</div>
						<div className="card-body">
							<form onSubmit={OnAddAnAddressClick} className="form-floating">
								<div className=" col-10 mx-auto m-3 ">
									<label for="id" className="form-label">
										User ID
									</label>
									<input
										type="text"
										className="form-control"
										id="id"
										aria-describedby="id"
										onChange={userIdTextHandler}
										value={userId}
										disabled
									/>
									<span className="text-danger">{userIdErr}</span>
								</div>
								<div className="my-3 col-10 mx-auto  ">
									<label for="addrName" className="form-label ">
										Address Name
									</label>
									<input
										type="text"
										className="form-control"
										id="addrName"
										placeholder="Home, Work, etc."
										onChange={addressNameTextHandler}
										value={addressName}
									/>
									<span className="text-danger">{addressNameErr}</span>
								</div>
								<div className="row">
									<div className="my-3 col-4 mx-auto">
										<label for="city" className="form-label ">
											City
										</label>
										<input
											type="text"
											className="form-control"
											id="city"
											placeholder="Mumbai"
											onChange={cityTextHandler}
											value={city}
										/>
										<span className="text-danger">{cityErr}</span>
									</div>
									<div className="my-3 col-4 mx-auto">
										<label for="state" className="form-label">
											State
										</label>
										<input
											type="text"
											className="form-control"
											id="state"
											placeholder="Maharashtra"
											onChange={stateTextHandler}
											value={state}
										/>
										<span className="text-danger">{stateErr}</span>
									</div>
								</div>

								<div className="row">
									<div className="my-3 col-4 mx-auto">
										<label for="addrName" className="form-label ">
											Country
										</label>
										<input
											type="text"
											className="form-control"
											id="addrName"
											placeholder="India"
											onChange={countryTextHandler}
											value={country}
										/>
										<span className="text-danger">{countryErr}</span>
									</div>
									<div className="m-3 col-4 mx-auto">
										<label for="pin" className="form-label ">
											Pin Code
										</label>
										<input
											type="text"
											className="form-control"
											id="pin"
											placeholder="400001"
											onChange={pinCodeTextHandler}
											value={pinCode}
										/>
										<span className="text-danger">{pinCodeErr}</span>
									</div>
								</div>
								<div className="m-3 col-10 mx-auto  ">
									<label for="detaddr" className="form-label ">
										Detailed Address
									</label>
									<textarea
										className="form-control"
										style={{ resize: "none" }}
										aria-label="detaddr"
										rows={3}
										maxLength={190}
										placeholder="Maximum 190 characters"
										onChange={detailedAddressTextHandler}
										value={detailedAddress}
									></textarea>
									<span className="text-danger">{detailedAddressErr}</span>
								</div>
								<div className="text-center col-5 mx-auto m-5">
									<button type="submit" className="btn btn-warning btn-lg">
										Save This Address &nbsp; <FontAwesomeIcon icon={faAddressBook} />
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddAddressComponent;
