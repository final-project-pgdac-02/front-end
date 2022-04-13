import React, { useState } from 'react'
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalf, faStar  } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
import FeedbackListComponent from './FeedbackListComponent';
import { NavLink } from 'react-router-dom';

const BookCardComponent = (props) => {

	const bookRating = props.book.averageRating;

	const [isFeedBackVisible, setIsFeedbackVisible]=useState(false); 

	const onFeedBackClickHandler=()=>{
		setIsFeedbackVisible(!isFeedBackVisible);
	}

	const id = props.book.id;
	return (
		<div className="m-4 d-flex justify-content-center">
			<Card style={{ width: "18rem" }} className="shadow">
				<NavLink to={`/books/${id}`}>
					<Card.Img
						variant="top"
						// src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/7/30/1406719196162/b57b6007-afb1-4e3c-8263-b29f6534aee8-1360x2040.jpeg?width=1010&quality=45&auto=format&fit=max&dpr=2&s=8a635c36538c519c575eb3b262c90e7e"
						src={props.book.bookCover}
						// src="https://neelkanthpublishers.com/assets/bookcover.png"
                        className="p-2"
					/>
				</NavLink>
				{/* </a> */}
				<Card.Header as="h5" className="text-center">
					{props.book.bookTitle}
				</Card.Header>
				<Card.Body>
					<Card.Title className="text-center fw-light"> ₹ {props.book.price} </Card.Title>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroupItem>
						<em>Author : </em> {props.book.author}
					</ListGroupItem>
					<ListGroupItem>
						<em>Category : </em>
						{props.book.category}
					</ListGroupItem>
					<ListGroupItem>
						<em>Publication : </em>
						{props.book.publication}
					</ListGroupItem>
				</ListGroup>
				<Card.Body className="text-center text-warning">
					{[...Array(parseInt(bookRating))].map((e, i) => (
						<FontAwesomeIcon key={i} icon={faStar} />
					))}

					{bookRating - parseInt(bookRating) > 0.5 && <FontAwesomeIcon icon={faStarHalf} />}
				</Card.Body>
				<Card.Body className="text-center">
					<Button variant="secondary rounded-pill">
						<NavLink to={`/books/${id}`} className="text-decoration-none text-light">
							View Details
						</NavLink>
					</Button>
				</Card.Body>
				{isFeedBackVisible && <FeedbackListComponent bookId={props.book.id} />}
			</Card>
		</div>
	);
}

export default BookCardComponent