import { useEffect, useState } from "react";
import AdminService from "../../service/AdminService";
import { useNavigate } from "react-router-dom";


const ViewAllBooks = () => {

    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const role = window.sessionStorage.getItem("sessionObjectRole");
        if(role!== "ADMIN"){
            navigate("/forbidden");
        }
        window.scrollTo(0,0);
        AdminService.viewBookDetails().then((response) => {
            setBookList(response.data);
        }).catch((error) => {
            console.log("found error", error);
        })
    }, []);

    let UpdateStock = (bookId) => {
        navigate("/updateBookStock/" + bookId);
    }

    let UpdateBook = (bookId) => {
        navigate("/updateBookDetails/" + bookId);
    }

    return (
		<>
			<div className="card" style={{ margin: 50, marginLeft: 150, marginRight: 150 }}>
				<table className="table align-middle mb-0 bg-white table-striped table-hover text-center">
					<thead className="thead-dark">
						<tr>
							<th scope="col" className="lead fs-3">
								ID
							</th>
							<th scope="col" className="lead fs-3">
								Name
							</th>
							<th scope="col" className="lead fs-3">
								Author
							</th>
							<th scope="col" className="lead fs-3">
								Category
							</th>
							<th scope="col" className="lead fs-3">
								Stock
							</th>
							<th scope="col" className="lead fs-3">
								Price
							</th>
							<th scope="col" className="lead fs-3">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="fs-5 lead">
						{bookList.map((value, key) => {
							return (
								<tr>
									<td>{value.id}</td>
									<td>{value.bookTitle}</td>
									<td>{value.author}</td>
									<td>{value.category}</td>
									<td>{value.stock}</td>
									<td>{value.price}</td>
									<td className="d-flex justify-content-evenly">
										<button
											type="button"
											className="btn btn-success mx-2"
											onClick={() => {
												UpdateStock(value.id);
											}}
										>
											Increment Stock
										</button>				
										<button
											type="button"
											className="btn btn-danger"
											onClick={() => {
												UpdateBook(value.id);
											}}
										>
											Update Details
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
export default ViewAllBooks;