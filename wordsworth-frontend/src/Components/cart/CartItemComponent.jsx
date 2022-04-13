import React, { useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const CartItemComponent = (props) => {
	

    const [quantity, setQuantity] = useState(props.item.quantity);


    const increment = async () => {
        setQuantity(quantity+1)
		const res=await axios.put(`http://localhost:8080/cart/increment/${props.item.cartItemId}`);
		console.log(res.data);
		props.update();
    }
    const decrement = async () => {
		if (quantity > 1) {
			setQuantity((quantity) => quantity - 1);
			const res=await axios.put(`http://localhost:8080/cart/decrement/${props.item.cartItemId}`);
			console.log(res.data);
			props.update();
		}
	};

	const deleteItem=async() =>{
		const res=await axios.delete(`http://localhost:8080/cart/${props.item.cartItemId}`)
		console.log(res.data);
		props.update();
	}
	

    return (
		<div>
			<div className="card m-3 shadow" style={{ maxWidth: "60rem" }}>
				<div className="row g-0 d-flex flex-wrap align-items-center">
					<div className="col-2 text-center py-4">
					<NavLink to={`/books/${props.item.bookId}`}>
							<img src={props.item.bookCover} alt="book cover" style={{ width: "6rem" }} />
						</NavLink>
					</div>
					<div className="col-4 text-center ">
						<div className="card-body">
							<h5 className="card-title  display-5 fs-2">{props.item.bookTitle}</h5>
						</div>
					</div>
					<div className="col-3 text-center ">
						<div className="card-body row g-0 d-flex flex-wrap align-items-center">
							<div className="col">
								<button className="btn btn-light rounded-circle" onClick={increment}>
									<FontAwesomeIcon icon={faAngleUp} />
								</button>
							</div>
							<div className="col">
								<input
									type="text"
									className="form-control form-control-lg text-center rounded-pill"
									id="quantity"
									min="1"
									disabled
									value={quantity}
								/>
							</div>
							<div className="col">
								<button className="btn btn-light rounded-circle" onClick={decrement}>
									<FontAwesomeIcon icon={faAngleDown} />
								</button>
							</div>
						</div>
					</div>
					<div className="col-2 text-center ">
						<div className="card-body ">
							<h5 className="card-title display-6 fs-3 text-muted">₹ {props.item.price}</h5>
						</div>
					</div>
					<div className="text-center col-1">
						<div className="card-body ">
							<h5 className="card-title text-muted lead">
								<button className="btn btn-light rounded-circle fs-5 text-muted" onClick={deleteItem}>
									<FontAwesomeIcon icon={faXmark} />
								</button>
							</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartItemComponent