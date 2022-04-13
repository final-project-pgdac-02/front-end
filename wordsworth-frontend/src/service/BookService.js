import axios from "axios";
const BOOK_SERVICE_API_URL = "http://localhost:8080/books";

const processFeedBack = (id,feedbackObject) => {
    return axios.post(BOOK_SERVICE_API_URL + "/addFeedback/"+ id,feedbackObject);
}

const getBookDetails = (id) => {
    return axios.get(BOOK_SERVICE_API_URL + "/" + id);
}

export default {processFeedBack, getBookDetails};