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
                         <img src="https://wordclerks.com/assets/img/features/noorders.png" width="400" height="450" class="img-fluid mb-4 mr-3" alt='hello' />
                        <h3><strong>You haven't ordered anything yet :( </strong></h3>
                        <h4>Order something to make this shopping bag happy!!</h4>
                        <Link className="btn btn-lg btn-outline-success cart-btn-transform m-3" to="/">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default EmptyOrderHistoryComponent