import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AddCardComponent from "../user/AddCardComponent";
import CardComponent from "./CardComponent";

const CardListCoponent = (props) => {
	useEffect(() => {
		getCardList();
	}, []);

	const navigate = useNavigate();

	const userId = window.sessionStorage.getItem("sessionObjectId");
	const [cardList, setCardList] = useState([]);
	const [loading, setLoading] = useState(false);

	const getCardList = async () => {
		console.log(userId);
		const res = await axios.get(`http://localhost:8080/user/getcards/${userId}`)
		setCardList(res.data);
		setLoading(true);
	}

	const onAddCardHandler=()=>{
		navigate("/addacard")
	}


	const getSelectedCard = (value) => {
		console.log(value + " In parent card");
		props.getData(value);
	};

	return (
		<div className="card m-5 mx-auto border-0" style={{ width: "70%" }}>
			{
				loading && cardList.length===0 && <div> <p class="text-danger" style={{ fontSize: '25px'}}>
				You don't have any saved cards..
			</p>
				{/* <Link to="/addacard" style={{ color: 'mediumorchid', fontSize: '25px', backgroundColor: 'lightcyan'}}>Add A Card</Link> */}
				<Button size="lg" onClick={onAddCardHandler} variant="outline-info">Add a Card</Button>
			</div>
			}
			{loading && cardList.map((card, i) =>
				<CardComponent card={card} key={i} selectedCard={getSelectedCard} />
			)}


		</div>
	);
};

export default CardListCoponent;
