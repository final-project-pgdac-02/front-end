import React from "react";

const CardComponent = (props) => {
	const cardChangeHandler = (e) => {
		console.log("val: " + e.target.value);
		props.selectedCard(e.target.value);


		console.log(props.card.expiryDate)
	};

	const expiryDate=Date.parse(props.card.expiryDate);
	const today=new Date();

	return (
		<div className="card-body">
			<div className="form-check">
				<input
					className="form-check-input"
					type="radio"
					name="card"
					id="card"
					value={props.card.cardId}
					style={{ transform: "scale(1.5)" }}
					onChange={cardChangeHandler}
				/>
				<label className="form-check-label card m-2 row border-3" htmlFor="card">
					<div className="card-title fs-3 text-center lead">{props.card.cardHolderName}'s Card</div>
					<hr />
					<div className="card-title lead fs-6">
						<div className="row">
							<div className="col-4">Card Number</div>
							<div className="col-1">:</div>
							<div className="col-7">XXXX - XXXX - XXXX - {props.card.cardNumberLastFourDigits}</div>
						</div>
					</div>
					<div className="card-title lead fs-6">
						<div className="row">
							<div className="col-4">Type</div>
							<div className="col-1">:</div>
							<div className="col-7">{props.card.type}</div>
						</div>
					</div>
					<div className="card-title lead fs-6">
						<div className="row">
							<div className="col-4">Expiry Date</div>
							<div className="col-1">:</div>
							<div className="col-7">{props.card.expiryDate}</div>
						</div>
					</div>
				</label>
				{ expiryDate<today &&
					<p className="text-danger">
						This card is expired!!
					</p>
				}
				
				<br />
			</div>
		</div>
	);
};

export default CardComponent;
