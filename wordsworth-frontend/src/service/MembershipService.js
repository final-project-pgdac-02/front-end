import axios from "axios";
const MEMBERSHIP_SERVICE_API_URL = "http://localhost:8080/memberships";

const processSetDiscountStatus = (membershipObject) => {
    return axios.put(MEMBERSHIP_SERVICE_API_URL + "/status", membershipObject);
}
const processSetDiscountPercent = (membershipObject) => {
	return axios.put(MEMBERSHIP_SERVICE_API_URL + "/percent", membershipObject);
};
const processSetMembershipCost= (membershipObject) => {
	return axios.put(MEMBERSHIP_SERVICE_API_URL + "/cost", membershipObject);
};

export default { processSetDiscountStatus, processSetDiscountPercent, processSetMembershipCost };