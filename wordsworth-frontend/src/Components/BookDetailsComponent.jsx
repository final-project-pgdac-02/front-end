import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faComment, faStarHalf, faStar, faCommentMedical } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FeedbackListComponent from "./FeedbackListComponent";

const BookDetailsComponent = (props) => {
	const bookRating = props.book.averageRating;

	const [isFeedBackVisible, setIsFeedbackVisible] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	const loggedInUserID = window.sessionStorage.getItem("sessionObjectId");

	useEffect(() => {
		if(loggedInUserID !== null){
			setLoggedIn(true);
		}
	})

	const onFeedBackClickHandler = () => {
		setIsFeedbackVisible(!isFeedBackVisible);
	};
	const navigate = useNavigate();

	const id = props.book.id;

	let feedbackHandler = (e) => {
		e.preventDefault();
		if(loggedIn){
			navigate("/addFeedback/" + id);
		}
		else{
			navigate("/login");
		}
	};

	const userId = window.sessionStorage.getItem("sessionObjectId");
	const userName = window.sessionStorage.getItem("sessionObjectFirstName");

	const addProductToCart = async () => {
		try {
			const res = await axios.post(`http://localhost:8080/user/addtocart`, {
				bookId: props.book.id,
				userId: parseInt(userId),
				quantity: 1,
			});
			window.alert(res.data);
			console.log(res.data);
			// alert("product added to cart successfully");
		} catch (err) {
			alert(err);
		}
	};

	const onAddToCartClickHandler = async () => {
		try {
			// console.log(userName);
			if (!userId) {
				window.alert("You need to Login first to add product to your cart");
				navigate("/login");
			} else {
				await addProductToCart();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="card m-5 d-flex justify-content-center shadow" style={{ width: "90rem", margin: "10rem" }}>
			<div className="row g-0">
				<div className="col-4 d-flex align-items-center">
					<img
						// src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/7/30/1406719196162/b57b6007-afb1-4e3c-8263-b29f6534aee8-1360x2040.jpeg?width=1010&quality=45&auto=format&fit=max&dpr=2&s=8a635c36538c519c575eb3b262c90e7e"
						src={props.book.bookCover}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null; // prevents looping
							currentTarget.src = "https://neelkanthpublishers.com/assets/bookcover.png";
						}}
						className="img-fluid rounded p-4"
						alt="book cover"
					/>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h1 className="card-title display-2 text-center m-2 ">{props.book.bookTitle}</h1>
						<br />
						<blockquote className="blockquote">
							<footer className="blockquote-footer text-center">
								<h3>
									<cite title="Source Title"> By {props.book.author}</cite>
								</h3>
							</footer>
						</blockquote>
						<hr />
						<Row>
							<Col>
								<div className="text-center p-4 display-5 text-muted">
									<small>
										{/* <strong>
											<em>Price : </em>
										</strong> */}
										₹ {props.book.price}
									</small>
								</div>
							</Col>
							<Col>
								<div className="text-center text-warning p-4 display-5">
									<small>
										{[...Array(parseInt(bookRating))].map((e, i) => (
											<FontAwesomeIcon key={i} icon={faStar} />
										))}

										{bookRating - parseInt(bookRating) > 0.5 && (
											<FontAwesomeIcon icon={faStarHalf} />
										)}
									</small>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<div className="text-center  display-5 text-muted small">
									<h3>
										<small>
											<em>
												<strong>Category :</strong>
											</em>{" "}
											{props.book.category}
										</small>
									</h3>
								</div>
							</Col>
							<Col>
								<div className="text-center  display-5 text-muted small">
									<h3>
										<small>
											<em>
												<strong>Publication : </strong>
											</em>
											{props.book.publication}
										</small>
									</h3>
								</div>
							</Col>
						</Row>

						<Row>
							<Col>
								<div className="text-center  display-5 p-4 text-muted small">
									<h3>
										<small>
											<em>
												<strong>ISBN : </strong>
											</em>
											{props.book.isbn}
										</small>
									</h3>
								</div>
							</Col>
							{props.book.stock <= 10 ? ( props.book.stock ===0 ? <Col>
									<div className="text-center text-danger display-5 p-4 small">
										<h3>
											<small>
												<strong>Out of Stock!</strong>
											</small>
										</h3>
									</div>
								</Col>:
								<Col>
									<div className="text-center text-danger display-5 p-4 small">
										<h3>
											<small>
												<strong>Only {props.book.stock} left in stock!</strong>
											</small>
										</h3>
									</div>
								</Col>
							) : null}
						</Row>
						<Row>
							<Col>
								<div className="text-center p-4">
									<Button variant="warning " onClick={onAddToCartClickHandler}>
										<h5 className="display-5">
											Add To Cart <FontAwesomeIcon icon={faCartShopping} />
										</h5>
									</Button>
								</div>
							</Col>
						</Row>
						<Card.Body className="text-center">
							<div className="row mx-auto" style={{ width: "60%" }}>
								<div className="col">
									<Button variant="light fs-5" onClick={onFeedBackClickHandler}>
										View Feedbacks &nbsp; <FontAwesomeIcon icon={faComment} />
									</Button>
								</div>

								<div className="col">
									<Button variant="dark fs-5" onClick={feedbackHandler}>
										Add a Feedback &nbsp; <FontAwesomeIcon icon={faCommentMedical} />
									</Button>
								</div>
							</div>
						</Card.Body>

						{/* {
					isFeedBackVisible && <FeedbackListComponent bookId={props.book.id} />
				} */}
					</div>
				</div>
			</div>
			{/* <Card.Body className="text-center">
								<Button variant="secondary" onClick={onFeedBackClickHandler}>View Feedbacks</Button>
							</Card.Body> */}

			{isFeedBackVisible && (
				<div className="mt-3">
					<FeedbackListComponent bookId={props.book.id} />
				</div>
			)}
		</div>
	);
};

export default BookDetailsComponent;
