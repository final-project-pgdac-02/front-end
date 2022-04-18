import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import BookCardComponent from "./BookCardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import BookDetailsComponent from "./BookDetailsComponent";

// const Books=()=>{
// 	useEffect(()=>{
// 		getBookList();
// 	},[]);
// }

const BooksListComponent = () => {
	useEffect(() => {
		getBookList();
	}, []);

	const [show, setShow] = useState("");
	// const [show1,setShow1] = useState("");
	// const [show2,setShow2] = useState("");

	const snackBar = window.sessionStorage.getItem("snackbar");

	useEffect(() => {
		// window.scrollTo(0,0);

		if (snackBar === "show") {
			console.log(snackBar);
			setShow(snackBar);
			setTimeout(function () {
				setShow("");
				clearTimeout();
			}, 3000);
			window.sessionStorage.removeItem("snackbar");
		}
	}, []);

	// const BooksListComponent = () => {

	const [loading, setLoading] = useState(false);
	const [bookList, setBookList] = useState([]);

	const [pageNumber, setPageNumber] = useState(0);

	const booksPerPage = 7;

	const pagesVisited = pageNumber * booksPerPage;




	const getBookList = async () => {
		try {
			const res = await axios.get("http://localhost:8080");
			setBookList(res.data);
			setLoading(true);
		} catch (err) {
			alert(err);
		}
	};

	const displayBooks = bookList.slice(pagesVisited, pagesVisited + booksPerPage).map((book, i) => {
		return (
			<Col key={i}>
				<BookCardComponent key={i} book={book} />
			</Col>
		)
	})

	const pageCount = Math.ceil(bookList.length / booksPerPage); //4

	const nextPageClickhandler = () => {
		if (pageNumber < pageCount - 1) {
			setPageNumber(pageNumber + 1);
			window.scroll(0, 0);
		}
	}

	const prevPageClickhandler = () => {
		if (pageNumber > 0) {
			setPageNumber(pageNumber - 1);
			window.scroll(0, 0);
		}
	}

	return (
		<div>
			<Row className="g-4 m-2">{loading && displayBooks}</Row>
			{/* Pagination buttons start */}
			{loading && (
				<>
					<br />
					<br />
					<div className="row align-items-center">
						<div className="col-4 d-flex justify-content-end">
							<button
								type="button"
								class="btn btn-outline-light btn-lg rounded-circle border-3"
								onClick={prevPageClickhandler}
							>
								<FontAwesomeIcon icon={faAnglesLeft} />
							</button>
						</div>
						<div className="col-4 d-flex justify-content-center">
							<h6 className="fs-2 text-light lead ">
								Page {pageNumber + 1} of {pageCount}
							</h6>
						</div>
						<div className="col-4 d-flex justify-content-start ">
							<button
								type="button"
								class="btn btn-outline-light btn-lg rounded-circle border-3"
								onClick={nextPageClickhandler}
							>
								<FontAwesomeIcon icon={faAnglesRight} />
							</button>
						</div>
					</div>
				</>
			)}

			{/* Pagination buttons end */}
			<div className={show} id="snackbar">
				Login Successful
			</div>
		</div>
	);
};

export default BooksListComponent;
