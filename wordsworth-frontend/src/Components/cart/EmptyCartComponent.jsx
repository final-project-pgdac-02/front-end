import React from "react";
import { Link } from "react-router-dom";

const EmptyCartComponent = () => {
	return (
		<div>
			<div class="container-fluid mt-100">
				<div class="row m-5">
					<div class="col-md-12">
						<div class="card">
							<div class="card-body cart">
								<div class="col-sm-12 empty-cart-cls text-center">
									{/* <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="img-fluid mb-4 mr-3" alt='hello' /> */}
									<img
										src="https://uat-app.viveks.com/static/frontend/MageBig/martfury_layout02/en_GB/images/empty-cart.svg"
										width="600"
										height="400"
										class="img-fluid mb-4 mr-3"
										alt="Empty Cart"
									/>
									<br />
									<br />
									<h2 className="display-5">Your Cart is Empty :( </h2>
									<br />
									<Link className="btn btn-lg btn-outline-success cart-btn-transform m-3" to="/">
										Continue Shopping
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmptyCartComponent;
