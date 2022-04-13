import axios from "axios";
const USER_SERVICE_API_URL = "http://localhost:8080/user";

const processLoginForm = (loginRequest) => {
    return axios.post(USER_SERVICE_API_URL + "/login" , loginRequest);
}

const processRegisterForm = (userObject) => {
return axios.post(USER_SERVICE_API_URL + "/registration", userObject);
}

const updatePassword = (passwordObject) => {
    return axios.put(USER_SERVICE_API_URL + "/changepassword" , passwordObject);
}

const addAnAddress = (userId, addressObject) => {
	return axios.post(USER_SERVICE_API_URL + "/addanaddress/" + userId, addressObject);
};

const addACard = (userId, cardObject) => {
	return axios.post(USER_SERVICE_API_URL + "/addacard/" + userId, cardObject);
};

export default { processLoginForm, processRegisterForm, updatePassword, addAnAddress, addACard };