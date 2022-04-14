import React, { useState, useRef, useEffect } from "react";
import { Overlay, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faStar, } from "@fortawesome/free-solid-svg-icons";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";
import BookCardComponent from "./BookCardComponent";

const AdvancedSearchComponent = () => {
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

	const navigate = useNavigate();

	const [search, setSearch] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log("clicked!!");
		setShow(!show);
		navigate(`/advancedsearchresult?category=${category}&rating=${rating}&min=${minPrice.toString()}&max=${maxPrice.toString()}`);
		setCategory("");
		setRating(1);
		// setSearch(!search);
		// navigate("/login");
	};

	// <Navigate to={"/books/"+2} />

	const handleClick = (event) => {
		setShow(!show);
		setTarget(event.target);
	};

	const [category, setCategory] = useState("");
	const [rating, setRating] = useState("");
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(9999);

	const onCategorySelectHandler = (e) => {
		console.log(e.target.value);
		setCategory(e.target.value);
	}


	const ratingSelectHandler = (e) => {
		setRating(e.target.value);
		console.log(rating);
	}

	const minPriceSelectHandler = (e) => {
		setMinPrice(e.target.value);
	}

	const maxPriceSelectHandler = (e) => {
		setMaxPrice(e.target.value);
	}
	// const [value,setValue]=useState();

	// useEffect(()=>{
	// },[value]);

	const link = `/advancedsearchresult?category=${category}&rating=${rating}&min=${minPrice}&max=${maxPrice}`;

	window.sessionStorage.setItem("searchParams", link);
	return (
		<>
			{/* {search && <Navigate to="/login" />} */}
			{/* {search && navigate("/advancedsearchresult")} */}
			<div ref={ref}>
				<FontAwesomeIcon
					icon={faSearchengin}
					className="mx-auto fs-3 text-decoration-none text-muted"
					onClick={handleClick}
				/>
				<Overlay show={show} target={target} placement="bottom" container={ref}>
					<Popover id="popover-contained" style={{ maxWidth: "60%" }}>
						<Popover.Header as="h3" className="text-center">
							Advanced Search
						</Popover.Header>
						<Popover.Body>
							<div className="card-body">
								<form>
									<div className="row d-flex align-items-center">
										<div className="form-group col mx-auto text-center">
											<label className="form-label lead ">Category</label>
											<select className="form-select" id="category" onChange={onCategorySelectHandler}>
												<option value="" defaultValue>
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
										</div>
										<div className="form-group text-center col mx-auto">
											<label className="form-label fs-5 lead m-2">Rating</label>
											<div className="text-center">

												{/* Four Star & Up: */}

												{/* <button className="btn fw-light" value={4} onClick={ratingSelectHandler}> */}
												<button className="btn fw-light" onClick={() => setRating(4)}>
													<FontAwesomeIcon icon={faStar} className="text-warning" />
													<FontAwesomeIcon icon={faStar} className="text-warning" />
													<FontAwesomeIcon icon={faStar} className="text-warning" />
													<FontAwesomeIcon icon={faStar} className="text-warning" />
													<FontAwesomeIcon icon={faStar} className="text-secondary" />
													&nbsp; & &nbsp; Up
												</button>
												{/* </span> */}

												{/* Three Star & Up: */}

												<button className="btn fw-light" onClick={() => setRating(3)}>
													{/* <button className="btn fw-light" value={3} onClick={ratingSelectHandler}> */}
													<FontAwesomeIcon icon={faStar} className="text-warning" />
													<FontAwesomeIcon icon={faStar} className="text-warning" />
													<FontAwesomeIcon icon={faStar} className="text-warning" />
													<FontAwesomeIcon icon={faStar} className="text-secondary" />
													<FontAwesomeIcon icon={faStar} className="text-secondary" />
													&nbsp; & &nbsp; Up
												</button>

												{/* Two Star & Up: */}

												<button className="btn  fw-light" onClick={() => setRating(2)}>
													{/* <button className="btn fw-light" value={2} onClick={ratingSelectHandler}> */}

													<FontAwesomeIcon icon={faStar} className="text-warning" />
													<FontAwesomeIcon icon={faStar} className="text-warning" />
													<FontAwesomeIcon icon={faStar} className="text-secondary" />
													<FontAwesomeIcon icon={faStar} className="text-secondary" />
													<FontAwesomeIcon icon={faStar} className="text-secondary" />
													&nbsp; & &nbsp; Up
												</button>

												{/* One Star & Up: */}

												{/* <button className="btn fw-light" value={2} onClick={ratingSelectHandler}> */}
												<button className="btn  fw-light" onClick={() => setRating(1)}>
													<FontAwesomeIcon icon={faStar} className="text-warning" />
													<FontAwesomeIcon icon={faStar} className="text-secondary" />
													<FontAwesomeIcon icon={faStar} className="text-secondary" />
													<FontAwesomeIcon icon={faStar} className="text-secondary" />
													<FontAwesomeIcon icon={faStar} className="text-secondary" />
													&nbsp; & &nbsp; Up
												</button>

												<hr />
												<div>Search for books with rating <br></br>
													{
														[...Array(rating)].map((elementInArray, index) => (
															<span key={index}>
																<FontAwesomeIcon icon={faStar} className="text-warning" />
															</span>))
													}
													<br /> and up
												</div>


											</div>
										</div>


										<div className="row form-group text-center col mx-auto">
											<label className="form-label text-center fs-5 lead">Price Range</label>
											<div className="col mx-auto">
												<label htmlFor="min" className="form-label lead fs-6">
													Min
												</label>
												<input
													type="number"
													className="form-control"
													id="min"
													placeholder=" ₹  X"
													min={0}
													max={99999}
													defaultValue={0}
													onChange={(e) => { setMinPrice(e.target.value); console.log(minPrice) }}
												// onBlur={minPriceSelectHandler}
												/>
											</div>
											<div className="col mx-auto">
												<label htmlFor="max" className="form-label lead fs-6">
													Max
												</label>
												<input
													type="number"
													className="form-control"
													id="max"
													placeholder="₹  XXXX"
													max={99999}
													min={minPrice}
													defaultValue={99999}
													onChange={(e) => { setMaxPrice(e.target.value); console.log(maxPrice) }}
												// onBlur={maxPriceSelectHandler}
												/>
											</div>
										</div>
									</div>
									<hr className="my-4" />
									<div className="text-center mx-auto">
										<button type="submit" onClick={submitHandler} className="btn btn-danger btn-lg">
											Explore &nbsp;
											<FontAwesomeIcon icon={faBolt} />
										</button>
									</div>
								</form>
							</div>
						</Popover.Body>
					</Popover>
				</Overlay>
			</div>
		</>
	);
};

export default AdvancedSearchComponent;
