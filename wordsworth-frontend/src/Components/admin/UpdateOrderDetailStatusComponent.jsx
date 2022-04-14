import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UpdateOrderDetailStatusComponent = () => {
    
    const role = window.sessionStorage.getItem("sessionObjectRole");
    const navigate = useNavigate();

    useEffect(() => {
        if (role !== "ADMIN")
            navigate("/");
    }, []);

    const [orderDetailId, setOrderDetailId] = useState();
    // const [orderIdEntered, setOrderIdEntered]=useState(false);
    const [showForm, setShowForm] = useState(false);

    const [newStatus,setNewStatus]=useState("");

    const [shippingStatus, setShippingStatus] = useState("");
    const onOrderDetailIdChangehandler = (event) => {
        setOrderDetailId(event.target.value);
        // setOrderIdEntered(false);
        console.log(event.target.value);
    }

    const onShowShippingStatus = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/orderdetails/shippingstatus/${orderDetailId}`)
            if(res.data==="PENDING" || res.data==="PROCESSED" || res.data==="SHIPPED"){
                setShippingStatus(res.data);
                setShowForm(true);
            }else{
                alert(res.data)
                setShowForm(false)
            }
           
        } catch (err) {
            alert(err);
        }
    }

    const onStatusChangeHandler=(event)=>{
        setNewStatus(event.target.value);
        console.log(event.target.value);
    }

    const updateShippingStatus=async()=>{
        try {
            const res = await axios.put(`http://localhost:8080/orderdetails/updatestatus`,{
                orderDetailId:orderDetailId,
                shippingStatus:newStatus
            })
            alert(res.data)
            setShowForm(false);
        } catch (err) {
            alert(err);
        }
    }
    return (
        <div>

            <div class="card text-center mt-5 row align-items-center">
                {/* <div class="card-header">
                    Featured
                </div> */}
                <div className="card-body col-4 ">
                    <h5 class="card-title">Enter order detail Id:</h5>
                    <input type="number" name="oid" id="oid" value={orderDetailId} onChange={onOrderDetailIdChangehandler} />
                    <input type="button" value="Show shipping status" onClick={onShowShippingStatus} />
                    {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                    <br />
                    {
                        showForm && <div>
                            <label htmlFor="shippingStatus" className="form-label ">
										Shipping Status for Order Detail Id {orderDetailId}: 
									</label>
                            <input
                                type="text"
                                className="form-control"
                                id="shippingStatus"
                                aria-describedby="shippingStatus"
                                value={shippingStatus}
                                disabled
                            />

                            <select className="form-select" id="category" value={newStatus} onChange={onStatusChangeHandler}>
                                <option value="" defaultValue>
                                    Select a Status
                                </option>
                                        <option value="PENDING">PENDING</option>
                                        <option value="PROCESSED">PROCESSED</option>
                                        <option value="SHIPPED">SHIPPED</option>
                            </select>

                            <button type="button" className='btn btn-outline-success' onClick={updateShippingStatus}>Set Shipping Status</button>
                        </div>
                    }
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    )
}

export default UpdateOrderDetailStatusComponent