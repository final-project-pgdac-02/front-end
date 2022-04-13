import React, { useState } from "react";

const AddressComponent = (props) => {

    const addressChangeHandler = (e) => {
        console.log("val: "+e.target.value);
		props.selectedAddress(e.target.value);
		// console.log("id is: "+props.address.addressId);
    }

	return (
		<div className="card-body">
			<div className="form-check">
				<input
					className="form-check-input"
					type="radio"
					name="address"
					id="addr"
					value={props.address.addressId}
					style={{ transform: "scale(1.5)" }}
					onChange={addressChangeHandler}
				/>
				<label className="form-check-label card m-2 row border-3" htmlFor="addr">
					<div className="card-title fs-3 text-center lead">{props.address.addressName}</div>
					<hr />
					<div className="card-title lead fs-6">
						<div className="row">
							<div className="col-4">City</div>
							<div className="col-1">:</div>
							<div className="col-7">{props.address.city}</div>
						</div>
					</div>
					<div className="card-title lead fs-6">
						<div className="row">
							<div className="col-4">State</div>
							<div className="col-1">:</div>
							<div className="col-7">{props.address.state}</div>
						</div>
					</div>
					<div className="card-title lead fs-6">
						<div className="row">
							<div className="col-4">Country</div>
							<div className="col-1">:</div>
							<div className="col-7">{props.address.country}</div>
						</div>
					</div>
					<div className="card-title lead fs-6">
						<div className="row">
							<div className="col-4">Detailed Address</div>
							<div className="col-1">:</div>
							<div className="col-7">
								{props.address.detailedAddress}
							</div>
						</div>
					</div>
					<div className="card-title lead fs-6">
						<div className="row">
							<div className="col-4">PIN</div>
							<div className="col-1">:</div>
							<div className="col-7">{props.address.pinCode}</div>
						</div>
					</div>
				</label>
			</div>
		</div>
	);
};

export default AddressComponent;
