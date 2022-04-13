import axios from "axios";
const ADMIN_SERVICE_API_URL = "http://localhost:8080/admin";

const processAddBook = (bookObject) => {
    return axios.post(ADMIN_SERVICE_API_URL + "/addNewBook",bookObject);
}

const getAllUserList = () => {
    return axios.get(ADMIN_SERVICE_API_URL + "/allUsers");
}

const deleteAUser = (id) => {
    return axios.delete(ADMIN_SERVICE_API_URL + "/deleteUser/"+id);
}

const updateProfile = (id,userObject) => {
    return axios.put(ADMIN_SERVICE_API_URL + "/updateUserDetails/" + id, userObject);
}

const updateStock = (id, stockObject) => {
    return axios.put(ADMIN_SERVICE_API_URL + "/" + id + "/updateBookStock/" + stockObject);
}

const updateBookDetails = (id, bookObject) => {
    return axios.put(ADMIN_SERVICE_API_URL + "/updateBookDetails/" + id, bookObject);
}

const viewBookDetails = () => {
    return axios.get(ADMIN_SERVICE_API_URL + "/getAllBooks");
}


export default {processAddBook,getAllUserList,deleteAUser,updateProfile,updateStock,updateBookDetails,viewBookDetails}