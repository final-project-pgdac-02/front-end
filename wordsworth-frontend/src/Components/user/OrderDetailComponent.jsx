import React from 'react'
import { useNavigate } from 'react-router-dom';

const OrderDetailComponent = (props) => {

    const navigate=useNavigate();

    const amountSaved=Math.ceil((parseFloat(props.item.price)-parseFloat(props.item.discountedPrice))*100)/100;

    const textClass=amountSaved>0?"text-success":"text-muted";
    const paraClass=amountSaved>0?"card-text fw-bold fs-4":" card-text";
    const bookLink=`/books/${props.item.bookId}`;

    return (
		<>
			<div className="row g-0">
				<div className="card-header d-flex justify-content-between border">
					<div>
						<strong>
							<em>Ordered On</em>
						</strong>
						<br />
						{props.item.orderDate}
					</div>
					<div>
						<strong>
							<em>Discounted Price</em>
						</strong>
						<br />₹{props.item.discountedPrice}
					</div>
					<div>
						<strong>Order #</strong>
						<br />
						{props.item.orderId}
					</div>
				</div>
				<div className='row'>
					<div class="col-md-4">
						<img
							src={props.item.bookCover}
							className="img-fluid"
							alt={props.item.bookTitle}
							style={{ width: "175px", height: "250px", padding: "10px" }}
							onClick={() => {
								navigate(bookLink);
								console.log(bookLink);
							}}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null; // prevents looping
								currentTarget.src = "https://neelkanthpublishers.com/assets/bookcover.png";
							}}
						/>
					</div>
					<div className="col-md-8 p-2">
						<div className="card-body">
							<h5 className="card-title fs-1 lead">{props.item.bookTitle}</h5>
							<br />
							<p className="card-text d-flex justify-content-between">
								<span>
									<em>Shipping Status:</em> {props.item.shippingStatus}
								</span>
								<span>
									<em>Quantity:</em> {props.item.quantity}{" "}
								</span>
								{/* <span> </span> */}
							</p>
							<br />
							<p className={paraClass}>
								<small className={textClass}>You Saved: ₹ {amountSaved}</small>
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* <br /> */}
			<hr />
		</>
	);
}

export default OrderDetailComponent