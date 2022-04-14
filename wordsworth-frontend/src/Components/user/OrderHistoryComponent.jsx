import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, ListGroup, Row, Tab } from 'react-bootstrap'
import BookCardComponent from '../BookCardComponent'
import EmptyOrderHistoryComponent from './EmptyOrderHistoryComponent'
import InfoTextComponent from './InfoTextComponent'
import OrderDetailComponent from './OrderDetailComponent'

const OrderHistoryComponent = () => {

  useEffect(() => {
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

  return (
    <div d-flex justify-content-center>
      {
        loading && orderHistory.length !== 0 &&
        <div className="card lead shadow tab mb-3 m-2 mt-5 p-2 mx-auto" style={{ maxWidth: '1200px', margin: '2em' }} >
          {
            orderHistory.map((item, index) => (
              <OrderDetailComponent item={item} key={index} />
            ))}
        </div>
      }

      {
        loading && orderHistory.length === 0 && <EmptyOrderHistoryComponent />
      }
    </div>

  )
}

export default OrderHistoryComponent