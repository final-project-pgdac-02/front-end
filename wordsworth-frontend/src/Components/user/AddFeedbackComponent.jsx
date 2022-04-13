import React from 'react'
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BookService from "../../service/BookService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCommentMedical } from "@fortawesome/free-solid-svg-icons";



const AddFeedbackComponent = (props) => {
	let bookId = useParams(props.id);

	let navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [reviewerName, setReviewerName] = useState("");
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);

	const [reviewerNameErr, setReviewerNameErr] = useState("");
	const [reviewErr, setReviewErr] = useState("");
	const [ratingErr, setRatingErr] = useState("");
	const [notLoggedIn, setNotLoggedIn] = useState(false);

	const getUserId = window.sessionStorage.getItem("sessionObjectId");
	useEffect(() => {
		if (getUserId === null) {
			alert("You need to login to add feedback!");
			setNotLoggedIn(true);
		}
	}, []);

	useEffect(() => {
		BookService.getBookDetails(bookId.id).then(response => {
			console.log(bookId.id);
			console.log(response.data.bookTitle);
			setTitle(response.data.bookTitle);
		}).catch(err => {
			window.alert("Something Went wrong", err);
		});
	}, []);


	let ReviewNameHandler = (event) => {
		setReviewerName(event.target.value);
		if (reviewerNameErr !== null || reviewerNameErr !== "") {
			setReviewerNameErr("");
		}
		// console.log(reviewerName);
	}

	let ReviewHandler = (event) => {
		setReview(event.target.value);
		if (reviewErr !== null || reviewErr !== "") {
			setReviewErr("");
		}
		// console.log(review);
	}

	let ratingTextHandler = (event) => {
		if (ratingErr !== null || ratingErr !== 0) {
			setRatingErr("");
		}
		// console.log("Handler " + rating);
	}

	let validation = () => {
		let flag = true;

		if (reviewerName === null || reviewerName === "") {
			setReviewerNameErr("This Field is Mandatory");
			flag = false;
		}

		if (review === null || review === "") {
			setReviewErr("This Field is Mandatory");
			flag = false;
		}

		if (rating === null || rating === 0) {
			setRatingErr("This Field is Mandatory");
			flag = false;
		}

		if (flag) {
			return true;
		}
	}


	let OnAddFeedbackClick = (e) => {
		e.preventDefault();
		if (validation()) {
			setReviewerNameErr("");
			setRatingErr("");
			setRatingErr("");

			let feedBackObject = { reviewerName, review, rating };
			BookService.processFeedBack(bookId.id, feedBackObject).then(resp => {
				window.alert("Feedback Added Successfully!", resp.data);
				console.log("Feedback Added Successfully!", resp.data);
				navigate("/books/" + bookId.id);
			}).catch((err) => {
				console.error("Something went wrong", err);
			});
		}
	}

	return (
		<>
			{notLoggedIn && <Navigate to="/login" />}
			{/* {addFeedbackDone && <Navigate to={"/books/" + bookId.id} />} */}
			<div>
				<br />
				<br />
				<div className="card mx-auto shadow" style={{ width: "45%" }}>
					<div className="row g-0 d-flex flex-wrap align-items-center">
						<div className="card-body">
							<h1 className="card-title display-4 text-center m-1 ">Tell Us What You Think </h1>
							<hr />
						</div>
						<form onSubmit={OnAddFeedbackClick}>
							<div className=" col-6 mx-auto m-3 ">
								<label htmlFor="title" className="form-label ">
									Book Title
								</label>
								<input
									type="text"
									className="form-control"
									id="title"
									aria-describedby="id"
									value={title}
									disabled
								/>
							</div>

							<div className="m-3 col-6 mx-auto  ">
								<label htmlFor="name" className="form-label ">
									Your Name
								</label>
								<input
									type="text"
									className="form-control"
									id="name"
									placeholder="William"
									onChange={ReviewNameHandler}
									value={reviewerName}
								/>
								<span className="text-danger">{reviewerNameErr}</span>
							</div>
							<div className="m-3 col-6 mx-auto  ">
								<label htmlFor="rating" className="form-label">
									Rating
								</label>
								<div className="star-rating text-center">
									{[...Array(5)].map((star, index) => {
										index += 1;
										return (
											<button
												type="button"
												key={index}
												className={
													index <= (hover || rating)
														? "text-warning fs-2 btn rounded-circle"
														: "text-secondary btn fs-2 rounded-circle"
												}
												onClick={(e) => {
													setRating(index);
													ratingTextHandler(e);
												}}
												onMouseEnter={() => setHover(index)}
												onMouseLeave={() => setHover(rating)}
											>
												<span className="star">
													<FontAwesomeIcon icon={faStar} />
												</span>
											</button>
										);
									})}
								</div>
								<span className="text-danger">{ratingErr}</span>
							</div>
							<div className="m-3 col-6 mx-auto">
								<label htmlFor="review" className="form-label ">
									Review
								</label>
								<textarea
									className="form-control"
									style={{ resize: "none" }}
									aria-label="review"
									rows={4}
									maxLength={450}
									placeholder="Maximum 450 characters"
									onChange={ReviewHandler}
									value={review}
								></textarea>
								<span className="text-danger">{reviewErr}</span>
							</div>
							<div className="text-center col-5 mx-auto m-5">
								<button type="submit" className="btn btn-warning btn-lg">
									Add my Feedback &nbsp; <FontAwesomeIcon icon={faCommentMedical} className="fs-4" />
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddFeedbackComponent;