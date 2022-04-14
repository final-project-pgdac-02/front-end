import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminService from "../../service/AdminService";
import BookService from "../../service/BookService";

const UpdateBookStockComponent = (props) => {

    let bookId = useParams(props.id);

    const [title, setTitle] = useState("");
    const [stock, setStock] = useState("");

    const [stockErr, setStockErr] = useState("");

    let navigate = useNavigate();
    const [loggedInNotAsAdmin, setLoggedInNotAsAdmin] = useState(false);
    const role = window.sessionStorage.getItem("sessionObjectRole");
    useEffect(() => {
        window.scrollTo(0, 0);
        if (role !== "ADMIN") {
            setLoggedInNotAsAdmin(true);
            alert("Only Admins can add new book!");
        }
    }, []);


    useEffect(() => {
        BookService.getBookDetails(bookId.id).then(response => {
            setTitle(response.data.bookTitle);
        }).catch(err => {
            console.log(err);
        });

    }, []);

    let validation = () => {

        let flag = true;

        if (stock === null || stock === "") {
            setStockErr("This Field is Mandatory");
            flag = false;
        }

        if (flag) {
            return true;
        }
    }

    let stockTextHandler = (event) => {
        setStock(event.target.value);
        if (stockErr !== null || stockErr !== "") {
            setStockErr("");
        }
    }

    let OnUpdateStockClick = (e) => {
        e.preventDefault();

        if (validation()) {

            setStockErr("");
            let updateStockObject = stock;

            AdminService.updateStock(bookId.id, parseInt(updateStockObject))
                .then(response => {
                    window.alert("Book Stock updated Successfully", response.data);
                    // console.log("Book Stock updated Successfully",response.data);

                    navigate("/bookList");
                }).catch(err => {
                    window.alert("Something Went wrong", err);
                });
        }
    };

    return (
		<div>
			<>
				{loggedInNotAsAdmin && <Navigate to="/forbidden" />}
				<div>
					<br />
					<br />
					<div className="card mx-auto shadow" style={{ width: "55%" }}>
						<div className="row g-0 d-flex flex-wrap align-items-center">
							<div className="card-body">
								<h1 className="card-title display-4 text-center m-1 ">Update Book Stock</h1>
								<hr />
							</div>
							<form onSubmit={OnUpdateStockClick}>
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
										// onChange={titleTextHandler}
										value={title}
										disabled
									/>
									{/* <span className="text-danger">{titleErr}</span> */}
								</div>

								<div className="col-7 mx-auto m-3">
									<label htmlFor="stock" className="form-label ">
										Stock
									</label>
									<input
										type="number"
										className="form-control"
										id="stock"
										placeholder="Update Book Stock"
										min={1}
										onChange={stockTextHandler}
										value={stock}
									/>
									<span className="text-danger">{stockErr}</span>
								</div>

								<div className="text-center col-5 mx-auto m-5">
									<button type="submit" className="btn btn-warning btn-lg fs-4">
										Update Book Stock
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</>
		</div>
	);
};


export default UpdateBookStockComponent;