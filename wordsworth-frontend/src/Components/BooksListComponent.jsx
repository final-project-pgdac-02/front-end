import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import BookCardComponent from "./BookCardComponent";
import axios from 'axios';
// import BookDetailsComponent from "./BookDetailsComponent";

// const Books=()=>{
// 	useEffect(()=>{
// 		getBookList();
// 	},[]);
// }


const BooksListComponent = () => {
	useEffect(()=>{
		getBookList();
	},[]);

	const [show,setShow] = useState("");
	// const [show1,setShow1] = useState("");
	// const [show2,setShow2] = useState("");


	const snackBar = window.sessionStorage.getItem("snackbar");
	


	useEffect(()=>{
		window.scrollTo(0,0);

		if(snackBar === "show"){
			console.log(snackBar);
			setShow(snackBar);
			setTimeout(function() {
				setShow(""); 
				clearTimeout();

			},3000 )
			window.sessionStorage.removeItem("snackbar");
		}	
	},[])

// const BooksListComponent = () => {

	const [loading, setLoading] = useState(false);
	const [bookList,setBookList]= useState([]);

	const getBookList=async ()=>{

		try{
			const res= await axios.get("http://localhost:8080");
			setBookList(res.data);
			setLoading(true);
		}catch(err){
			alert(err);
		}
		
	};

	return (
		<div>
			<Row className="g-4 m-2">
				{
					loading && bookList.map((book,i)=>(
						<Col key={i}>
							<BookCardComponent key={i} book={book} />
							{/* {book.bookTitle} */}
						</Col>
					))
				}

				{/* {Array.from({ length: 8 }).map((_, idx) => (
					<Col>
						<BookCardComponent />
					</Col>
				))} */}
			</Row>
			<div className={show} id="snackbar">LogIn Successfull</div>

		</div>
	);
};  

export default BooksListComponent;
