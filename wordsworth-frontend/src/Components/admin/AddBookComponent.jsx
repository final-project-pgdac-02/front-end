import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import AdminService from "../../service/AdminService";

const AddBookComponent = () => {
	const [loggedInNotAsAdmin, setLoggedInNotAsAdmin] = useState(false);
	const role = window.sessionStorage.getItem("sessionObjectRole");
	useEffect(() => {
		window.scrollTo(0, 0);
		if (role !== "ADMIN") {
			setLoggedInNotAsAdmin(true);
			alert("Only Admins can add new book!")
			// dispatch({ type: "ADMIN", payload: "admin" });
		}
	}, []);

	const [bookAdded, setBookAdded] = useState(false);
	const [hover, setHover] = useState(0);

	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [publication, setPublication] = useState("");
	const [category, setCategory] = useState("");
	const [bookCover, setBookCover] = useState("#");
	const [stock, setStock] = useState("");
	const [averageRating, setAverageRating] = useState(0);
	const [price, setPrice] = useState("");
	const [isbn, setIsbn] = useState("");

	const [titleErr, setTitleErr] = useState("");
	const [authorErr, setAuthorErr] = useState("");
	const [publicationErr, setPublicationErr] = useState("");
	const [categoryErr, setCategoryErr] = useState("");
	const [stockErr, setStockErr] = useState("");
	const [averageRatingErr, setAverageRatingErr] = useState("");
	const [priceErr, setPriceErr] = useState("");
	const [isbnErr, setIsbnErr] = useState("");

	let titleTextHandler = (event) => {
		setTitle(event.target.value);
		if (titleErr !== null || titleErr !== "") {
			setTitleErr("");
		}
		// console.log(title);
	};

	let AuthorTextHandler = (event) => {
		setAuthor(event.target.value);
		if (authorErr !== null || authorErr !== "") {
			setAuthorErr("");
		}
		// console.log(author);
	};

	let publicationHandler = (event) => {
		setPublication(event.target.value);
		if (publicationErr !== null || publicationErr !== "") {
			setPublicationErr("");
		}
		// console.log(publication);
	};

	let categoryHandler = (event) => {
		setCategory(event.target.value);
		if (categoryErr !== null || categoryErr !== "") {
			setCategoryErr("");
		}
		// console.log(category);
	};

	let bookCoverTextHandler = (event) => {
		setBookCover(event.target.value);
		// console.log(bookCover);
	};

	let stockTextHandler = (event) => {
		setStock(event.target.value);
		if (stockErr !== null || stockErr !== "") {
			setStockErr("");
		}
		// console.log(stock);
	};

	let averageRatingTextHandler = (event) => {
		// setAverageRating(event.target.value);
		if (averageRatingErr !== null || averageRatingErr !== "" || averageRatingErr !== 0) {
			setAverageRatingErr("");
		}
		console.log(averageRating);
	};

	let priceTextHandler = (event) => {
		setPrice(event.target.value);
		if (priceErr !== null || priceErr !== "") {
			setPriceErr("");
		}
		// console.log(price);
	};

	let isbnHandler = (event) => {
		setIsbn(event.target.value);
		if (isbnErr !== null || isbnErr !== "") {
			setIsbnErr("");
		}
		// console.log(isbn);
	};

	let validation = () => {
		let flag = true;

		if (title === null || title === "") {
			setTitleErr("This Field is Mandatory");
			flag = false;
		}
		if (author === null || author === "") {
			setAuthorErr("This Field is Mandatory");
			flag = false;
		}
		if (publication === null || publication === "") {
			setPublicationErr("This Field is Mandatory");
			flag = false;
		}
		if (category === null || category === "") {
			setCategoryErr("This Field is Mandatory");
			flag = false;
		}
		if (stock === null || stock === "") {
			setStockErr("This Field is Mandatory");
			flag = false;
		}
		if (averageRating === null || averageRating === 0) {
			setAverageRatingErr("This Field is Mandatory");
			flag = false;
		}
		if (price === null || price === "") {
			setPriceErr("This Field is Mandatory");
			flag = false;
		}
		if (isbn === null || isbn === "") {
			setIsbnErr("This Field Is Manadtory");
			flag = false;
		} else if (isbn.length > 13 || isbn.length < 13) {
			setIsbnErr("ISBN must be 13 digit in length");
			flag = false;
		}

		if (flag) {
			return true;
		}
	};

	let OnAddBookClick = (e) => {
		e.preventDefault();

		if (validation()) {
			setTitleErr("");
			setAuthorErr("");
			setPublicationErr("");
			setCategoryErr("");
			setStockErr("");
			setAverageRatingErr("");
			setPriceErr("");
			setIsbnErr("");

			let bookObject = {
				"bookTitle": title,
				author,
				publication,
				category,
				bookCover,
				stock,
				averageRating,
				price,
				isbn,
			};
			AdminService.processAddBook(bookObject)
				.then((resp) => {
					window.sessionStorage.setItem("sessionObjectBookId", resp.data.id);
					window.sessionStorage.setItem("sessionObjectBookTitle", resp.data.bookTitle);
					console.log("Book Added Successfully!", resp.data);
					window.alert("Book Added Successfully!", resp.data);
					// dispatch({ type: "ADMIN", payload: "admin" });
					setBookAdded(true);
				})
				.catch((err) => {
					console.log("Something Went Wrong, Please Enter Book Details Again !!");
				});
		}
	};

	return (
		<div>
			<>
				{bookAdded && <Navigate to="/" />}
				{loggedInNotAsAdmin && <Navigate to="/login" />}
				<div>
					<br />
					<br />
					<div className="card mx-auto shadow" style={{ width: "55%" }}>
						<div className="row g-0 d-flex flex-wrap align-items-center">
							<div className="card-body">
								<h1 className="card-title display-4 text-center m-1 ">Add a New Book to Wordsworth</h1>
								<hr />
							</div>
							<form onSubmit={OnAddBookClick}>
								<div className=" col-7 mx-auto m-3 ">
									<label htmlFor="title" className="form-label ">
										Book Title
									</label>
									<input
										type="text"
										className="form-control"
										id="title"
										aria-describedby="title"
										placeholder="The Memoirs of Sherlock Holmes"
										onChange={titleTextHandler}
										value={title}
									/>
									<span className="text-danger">{titleErr}</span>
								</div>
								<div className=" col-7 mx-auto m-3 ">
									<label htmlFor="author" className="form-label ">
										Book Author
									</label>
									<input
										type="text"
										className="form-control"
										id="author"
										aria-describedby="author"
										placeholder="Arthur Conan Doyle"
										onChange={AuthorTextHandler}
										value={author}
									/>
									<span className="text-danger">{authorErr}</span>
								</div>
								<div className=" col-7 mx-auto m-3 ">
									<label htmlFor="title" className="form-label ">
										Publication
									</label>
									<input
										type="text"
										className="form-control"
										id="title"
										aria-describedby="title"
										placeholder="G. Newnes Ltd."
										onChange={publicationHandler}
										value={publication}
									/>
									<span className="text-danger">{publicationErr}</span>
								</div>
								<div className=" form-group col-7 mx-auto m-3">
									<label className="form-label">Category</label>
									<select
										className="form-select"
										id="category"
										onChange={categoryHandler}
										value={category}
									>
										<option value="" defaultValue disabled>
											Select a Book Category
										</option>
										<option value="FANTASY">Fantasy</option>
										<option value="FICTION">Fiction</option>
										<option value="SCI_FI">Sci-Fi</option>
										<option value="MOTIVATIONAL">Motivational</option>
										<option value="ADVENTURE">Adventure</option>
										<option value="ROMANCE">Romance</option>
										<option value="SPORTS">Sports</option>
										<option value="NATURE">Nature</option>
										<option value="SELF_HELP">Self-Help</option>
										<option value="HISTORY">History</option>
										<option value="BIOGRAPHY">Biography</option>
										<option value="TRUE_CRIME">True-Crime</option>
										<option value="PHILOSOPHY">Philosophy</option>
										<option value="MYSTERY">Mystery</option>
										<option value="CHILDREN_LITERATURE">Children's Literature</option>
										<option value="SCIENCE">Science</option>
										<option value="EDUCATIONAL">Educational</option>
										<option value="MISC">Miscellaneous</option>
									</select>
									<span className="text-danger">{categoryErr}</span>
								</div>
								<div className=" col-7 mx-auto m-3 ">
									<label htmlFor="url" className="form-label ">
										Book Cover URL
									</label>
									<input
										type="text"
										className="form-control"
										id="url"
										aria-describedby="url"
										placeholder="www.xyz.com"
										onChange={bookCoverTextHandler}
										value={bookCover}
									/>
								</div>

								<div className=" col-7 mx-auto m-3 ">
									<label htmlFor="isbn" className="form-label ">
										ISBN
									</label>
									<input
										type="number"
										className="form-control"
										id="url"
										aria-describedby="isbn"
										placeholder="x x x x x x x x x x x x x x x x"
										minLength={13}
										maxLength={13}
										onChange={isbnHandler}
										value={isbn}
									/>
									<span className="text-danger">{isbnErr}</span>
								</div>
								<div className="m-3 col-7 mx-auto  ">
									<label htmlFor="rating" className="form-label">
										Average Rating
									</label>
									<div className="star-rating text-center">
										{[...Array(5)].map((star, index) => {
											index += 1;
											return (
												<button
													type="button"
													key={index}
													className={
														index <= (hover || averageRating)
															? "text-warning fs-2 btn rounded-circle"
															: "text-secondary btn fs-2 rounded-circle"
													}
													onClick={(e) => {
														setAverageRating(index);
														averageRatingTextHandler(e);
													}}
													onMouseEnter={() => setHover(index)}
													onMouseLeave={() => setHover(averageRating)}
												>
													<span className="star">
														<FontAwesomeIcon icon={faStar} />
													</span>
												</button>
											);
										})}
									</div>
									<span className="text-danger">{averageRatingErr}</span>
								</div>
								<div className="row col-7 mx-auto d-flex justify-content-between">
									<div className="col-6 ps-0">
										<label htmlFor="stock" className="form-label ">
											Stock
										</label>
										<input
											type="number"
											className="form-control"
											id="stock"
											placeholder="Available Stock"
											min={1}
											onChange={stockTextHandler}
											value={stock}
										/>
										<span className="text-danger">{stockErr}</span>
									</div>
									<div className="col-6 pe-0">
										<label htmlFor="price" className="form-label">
											Price
										</label>
										<input
											type="number"
											step={0.01}
											min={1}
											id="price"
											className="form-control"
											placeholder="₹  XXXX"
											onChange={priceTextHandler}
											value={price}
										/>
										<span className="text-danger">{priceErr}</span>
									</div>
								</div>
								<div className="text-center col-5 mx-auto m-5">
									<button type="submit" className="btn btn-warning btn-lg fs-4">
										Register This Book &nbsp; <FontAwesomeIcon icon={faBookBookmark} />
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</>
		</div>
	);
}


export default AddBookComponent;
