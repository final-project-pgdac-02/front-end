import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import AddressComponent from "./AddressComponent";

const AddressListComponent = (props) => {
	useEffect(() => {
		getAddressList();
	}, []);

	const userId = window.sessionStorage.getItem("sessionObjectId");
	const [addressList, setAddressList] = useState([]);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const getAddressList = async () => {
		console.log(userId);
		const res = await axios.get(`http://localhost:8080/user/getaddresses/${userId}`);
		setAddressList(res.data);
		setLoading(true);
	};

	const onAddAddressHandler = () => {
		navigate("/addanaddress");
	};

	const getSelectedAddress = (value) => {
		console.log(value + " In parent addr");
		// setAddr(value);
		props.getData(value);
	};

	return (
		<div className="card m-5 mx-auto border-0" style={{ width: "85%" }}>
			{loading && addressList.length === 0 && (
				<div className="text-center">
					<p class="text-danger display-6">
						<FontAwesomeIcon icon={faTriangleExclamation} className="m-2"/> <br /> You don't have any saved addresses!
					</p>
					<br />
					<Button size="lg" onClick={onAddAddressHandler} variant="outline-info">
						Add an Address
					</Button>
				</div>
			)}
			{loading &&
				addressList.map((address, i) => (
					<AddressComponent address={address} key={i} selectedAddress={getSelectedAddress} />
				))}
			{/* <AddressComponent val={1} getData={addrSelectHandler} />
			<AddressComponent val={2} getData={addrSelectHandler} />
			<AddressComponent val={3} getData={addrSelectHandler} /> */}
		</div>
	);
};

export default AddressListComponent;
