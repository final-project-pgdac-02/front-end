import axios from "axios"
const ORDER_DETAILS_SERVICE_API_URL = "http://localhost:8080/orderdetails";

const getAllOrderDetailsByOrderId = (id) => {
    return axios.get(ORDER_DETAILS_SERVICE_API_URL + "/" + id);
}

export default {getAllOrderDetailsByOrderId}