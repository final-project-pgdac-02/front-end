import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminService from "../../service/AdminService";
import BookService from "../../service/BookService";

const UpdateBookDetails = (props) => {

    let bookId = useParams(props.id);

    let navigate = useNavigate();

    const [loggedInNotAsAdmin, setLoggedInNotAsAdmin] = useState(false);
    const role = window.sessionStorage.getItem("sessionObjectRole");
    useEffect(() => {
        window.scrollTo(0, 0);
        if (role !== "ADMIN") {
            setLoggedInNotAsAdmin(true);
            alert("Only Admins can add new book!");
            // dispatch({ type: "ADMIN", payload: "admin" });
        }
    }, []);

    const [bookTitle, setBookTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [publication, setPublication] = useState("");
    const [bookCover, setBookCover] = useState("");
    const [isbn, setIsbn] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        BookService.getBookDetails(bookId.id).then(resp => {
            setBookTitle(resp.data.bookTitle);
            setAuthor(resp.data.author);
            setCategory(resp.data.category);
        })
    }, [])

    const [publicationErr, setPublicationErr] = useState("");
    const [bookCoverErr, setBookCoverErr] = useState("");
    const [isbnErr, setIsbnErr] = useState("");
    const [priceErr, setPriceErr] = useState("");

    let publicationHandler = (event) => {
        setPublication(event.target.value);
        if (publicationErr !== null || publicationErr !== "") {
            setPublicationErr("");
        }
        // console.log(publication);
    }

    let bookCoverTextHandler = (event) => {
        setBookCover(event.target.value);
        if (bookCoverErr !== null || bookCoverErr !== "") {
            setBookCoverErr("");
        }
        // console.log(bookCover);
    }

    let isbnHandler = (event) => {
        setIsbn(event.target.value);
        if (isbnErr !== null || isbnErr !== "") {
            setIsbnErr("");
        }
        // console.log(isbn);
    }

    let priceHandler = (event) => {
        setPrice(event.target.value);
        if (priceErr !== null || priceErr !== "") {
            setPriceErr("");
        }
        // console.log(price);
    }

    let validation = () => {
        let flag = true;

        if (publication === null || publication === "") {
            setPublicationErr("This Field is Mandatory");
            flag = false;
        }

        if (bookCover === null || bookCover === "") {
            setBookCoverErr("This Field is Mandatory");
            flag = false;
        }

        if (isbn === null || isbn === "") {
            setIsbnErr("This Field is Mandatory");
            flag = false;
        }else if (isbn.length > 13 || isbn.length < 13) {
			setIsbnErr("ISBN must be 13 digit in length");
            flag = false;
		}

        if (price === null || price === "") {
            setPriceErr("This Field is Mandatory");
            flag = false;
        }

        if (flag) {
            return true;
        }
    }

    let OnUpdateBookClick = (e) => {
        e.preventDefault();
        if (validation()) {
            setPublicationErr("");
            setBookCoverErr("");
            setPriceErr("");
            setIsbnErr("");

            let bookObject = { price, publication, isbn, bookCover };

            AdminService.updateBookDetails(bookId.id, bookObject).then(response => {
                window.alert("Book Updated Successfully!!", response.data);
                navigate("/bookList");
            }).catch(error => {
                window.alert("Something went worng", error);
            });

        }
    }

    return (
		<div>
			<>
				{loggedInNotAsAdmin && <Navigate to="/forbidden" />}
				<div>
					<br />
					<br />
					<div className="card mx-auto shadow" style={{ width: "55%" }} data-aos="flip-down">
						<div className="row g-0 d-flex flex-wrap align-items-center">
							<div className="card-body">
								<h1 className="card-title display-4 text-center m-1 ">Add a New Book to Wordsworth</h1>
								<hr />
							</div>
							<form onSubmit={OnUpdateBookClick}>
								<div className=" col-7 mx-auto m-3 ">
									<label htmlFor="bookTitle" className="form-label ">
										Book Title
									</label>
									<input
										type="text"
										className="form-control"
										id="bookTitle"
										aria-describedby="title"
										placeholder="The Memoirs of Sherlock Holmes"
										// onChange={titleTextHandler}
										value={bookTitle}
										disabled
									/>
									{/* <span className="text-danger">{titleErr}</span> */}
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
										// onChange={AuthorTextHandler}
										value={author}
										disabled
									/>
									{/* <span className="text-danger">{authorErr}</span> */}
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
									<label htmlFor="category" className="form-label">
										Category
									</label>
									<input
										type="text"
										className="form-select"
										id="category"
										// onChange={categoryHandler}
										value={category}
										disabled
									/>

									{/* <span className="text-danger">{categoryErr}</span> */}
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
									<span className="text-danger">{bookCoverErr}</span>
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

								<div className="row col-7 mx-auto d-flex justify-content-between">
									<div className="col-7 mx-auto m-3">
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
											onChange={priceHandler}
											value={price}
										/>
										<span className="text-danger">{priceErr}</span>
									</div>
								</div>
								<div className="text-center col-5 mx-auto m-5">
									<button type="submit" className="btn btn-warning btn-lg fs-4">
										Update This Book
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

export default UpdateBookDetails;