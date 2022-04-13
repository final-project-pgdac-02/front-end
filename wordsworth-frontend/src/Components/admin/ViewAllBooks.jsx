import { useEffect, useState } from "react";
import AdminService from "../../service/AdminService";
import { useNavigate } from "react-router-dom";


const ViewAllBooks = () => {


    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
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
            <div className="card" style={{ "margin": 50 }}>
                <table className="table align-middle mb-0 bg-white table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAME</th>
                            <th scope="col">Author</th>
                            <th scope="col">Category</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Price</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookList.map((value, key) => {

                            return (
                                <tr>
                                    <td>
                                        {key + 1}
                                    </td>
                                    <td>
                                        {value.bookTitle}
                                    </td>
                                    <td>
                                        {value.author}
                                    </td>
                                    <td>
                                        {value.category}
                                    </td>
                                    <td>
                                        {value.stock}
                                    </td>
                                    <td>
                                        {value.price}
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary" onClick={() => { UpdateStock(value.id) }}>Update Stock</button>&nbsp;
                                        <button type="button" className="btn btn-primary" onClick={() => { UpdateBook(value.id) }} >Update Details</button>
                                    </td>
                                </tr>
                            )


                        })}

                    </tbody>
                </table>
            </div>
        </>

    );
}
export default ViewAllBooks;