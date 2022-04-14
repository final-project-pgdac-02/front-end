import React from 'react'
import { Link } from 'react-router-dom'

const EmptyOrderHistoryComponent = () => {
  return (
		<div>
			<div class="container-fluid mt-100">
				<div class="row m-5">
					<div class="col-12">
						<div class="card">
							<div class="card-body cart">
								<div class="col-12 empty-cart-cls text-center">
									<img
										src="https://cvetokvs.ru/images/views/cart/noorders.png"
										width="500"
										height="450"
										class="img-fluid mb-4 mr-3"
										alt="hello"
									/>
                                    
									<h3 className='display-5'>
										You haven't ordered anything yet :( 
									</h3>
									<h4 className='display-6'>Order something to make this shopping bag happy!!</h4>
									<Link className="btn btn-lg btn-outline-success cart-btn-transform m-4" to="/">
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
}

export default EmptyOrderHistoryComponent