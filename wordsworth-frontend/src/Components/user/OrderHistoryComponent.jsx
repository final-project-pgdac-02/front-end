import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyOrderHistoryComponent from './EmptyOrderHistoryComponent'
import OrderDetailComponent from './OrderDetailComponent'

const OrderHistoryComponent = () => {


	const navigate=useNavigate();

  useEffect(() => {
	  if(!userId){
		  alert("You need to login first");
		  navigate("/")
	  }
    getOrderHistory();
  }, []);

  const userId = window.sessionStorage.getItem("sessionObjectId");
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrderHistory = async () => {
    const res = await axios.get(`http://localhost:8080/orderdetails/${userId}`);
    setOrderHistory(res.data);
    setLoading(true);
  }


  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 6;

  const pagesVisited = pageNumber * itemsPerPage;

  const pageCount = Math.ceil(orderHistory.length / itemsPerPage);


  const displayOrders = orderHistory.slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index) => {
    return (
      <OrderDetailComponent item={item} key={index} />
    )
  })

  const nextPageClickhandler = () => {
    if (pageNumber < pageCount - 1) {
      setPageNumber(pageNumber + 1);
      window.scroll(0, 0);
    }
  }

  const prevPageClickhandler = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
      window.scroll(0, 0);
    }
  }


  return (
		<div d-flex justify-content-center>
			{loading && orderHistory.length !== 0 && (
				<>
					<div
						className="card lead shadow tab mb-3 m-2 mt-5 p-2 mx-auto"
						style={{ maxWidth: "1200px", margin: "2em" }}
					>
						{displayOrders}
					</div>
					<br />
					<br />
					<div className="row align-items-center">
						<div className="col-4 d-flex justify-content-end">
							<button
								type="button"
								className="btn btn-outline-light btn-lg rounded-circle border-3"
								onClick={prevPageClickhandler}
							>
								<FontAwesomeIcon icon={faAnglesLeft} />
							</button>
						</div>
						<div className="col-4 d-flex justify-content-center">
							<h6 className="fs-2 text-light lead ">
								Page {pageNumber + 1} of {pageCount}
							</h6>
						</div>
						<div className="col-4 d-flex justify-content-start ">
							<button
								type="button"
								className="btn btn-outline-light btn-lg rounded-circle border-3"
								onClick={nextPageClickhandler}
							>
								<FontAwesomeIcon icon={faAnglesRight} />
							</button>
						</div>
					</div>
				</>
			)}

			{loading && orderHistory.length === 0 && <EmptyOrderHistoryComponent />}
		</div>
  );
}

export default OrderHistoryComponent