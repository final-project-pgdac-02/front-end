import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Components/Header';
import Footer from './Components/Footer';
import BooksListComponent from './Components/BooksListComponent';
import Book from './Components/Book';
import Login from './Components/user/Login'
import NotFound from './Components/errors/Notfound'
import Register from "./Components/user/Register";
import UpdatePasswordComponent from "./Components/user/UpdatePasswordComponent";
import UserDashboardComponent from './Components/admin/AdminDashboardComponent';
import AddAddressComponent from './Components/user/AddAddressComponent';
import AddCardComponent from './Components/user/AddCardComponent';
import AddFeedbackComponent from './Components/user/AddFeedbackComponent';
import UserCartComponent from "./Components/cart/UserCartComponent";
import AddBookComponent from './Components/admin/AddBookComponent';
import OrderFormComponent from './Components/orders/OrderFormComponent';
import { createContext, useEffect, useReducer } from 'react';
import { initializeState, reducer } from './Reducer/UseReducer';
import ViewAllUsers from './Components/admin/ViewAllUsers';
import UpdateProfile from './Components/admin/UpdateProfile';
import ViewAllBooks from './Components/admin/ViewAllBooks';
import UpdateBookDetails from './Components/admin/UpdateBookDetails';
import UpdateBookStockComponent from './Components/admin/UpdateBookStockComponent';
import MembershipDashboardComponent from './Components/admin/MembershipDashboardComponent';
import DiscountStatusComponent from './Components/admin/DiscountStatusComponent';
import DiscountPercentComponent from './Components/admin/DiscountPercentComponent';
import MembershipCostComponent from './Components/admin/MembershipCostComponent';
import AOS from 'aos';
import "aos/dist/aos.css";
import Search from './Components/Search';
import AdvancedSearchResultComponent from './Components/AdvancedSearchResultComponent';
import OrderHistoryComponent from './Components/user/OrderHistoryComponent';
import CustomerDashboardComponent from './Components/user/CustomerDashboardComponent';
import AdminDashboardComponent from './Components/admin/AdminDashboardComponent';
import UpgradeMembershipComponent from "./Components/user/UpgradeMembershipComponent";

export const UserContext = createContext();

function App() {

	const [state, dispatch] = useReducer(reducer, initializeState);
	const userObjectRole = window.sessionStorage.getItem("sessionObjectRole");

	useEffect(() => {
		if (userObjectRole === "CUSTOMER") {
			dispatch({ type: "USER", payload: "user" });
		}
		else if (userObjectRole === "ADMIN") {
			dispatch({ type: "ADMIN", payload: "admin" });
		}
		else {
			dispatch({ type: "USER", payload: "" });
			dispatch({ type: "ADMIN", payload: "" });
		}
		AOS.init();
	}, []);
    
	return (
		<div>
			<Router>
				<UserContext.Provider value={{ state, dispatch }}>
					<Header />
					<Routes>
						<Route path="/" element={<BooksListComponent />} />
						{/* <Route path="/" element={<UpgradeMembershipComponent />} /> */}

						<Route path="/books/:id" element={<Book />} />
						<Route path="/login" exact element={<Login />} />
						<Route path="/admindashboard" exact element={<AdminDashboardComponent />} />
						<Route path="/customerdashboard" exact element={<CustomerDashboardComponent />} />
						<Route path="/registration" exact element={<Register />} />
						<Route path="/changepassword" exact element={<UpdatePasswordComponent />} />
						<Route path="/addanaddress" exact element={<AddAddressComponent />} />
						<Route path="/addacard" exact element={<AddCardComponent />} />
						<Route path="/addFeedback/:id" exact element={<AddFeedbackComponent />} />
						<Route path="/usercart" exact element={<UserCartComponent />} />
						<Route path="/addNewBook" exact element={<AddBookComponent />} />
						<Route path="/viewAllUsers" exact element={<ViewAllUsers />} />
						<Route path="/updateProfile/:id" exact element={<UpdateProfile />} />
						<Route path="/updateBookStock/:id" exact element={<UpdateBookStockComponent />} />
						<Route path="/updateBookDetails/:id" exact element={<UpdateBookDetails />} />
						<Route path="/bookList" exact element={<ViewAllBooks />} />
						<Route path="/membership" exact element={<MembershipDashboardComponent />} />
						<Route path="/membership/status/:id" exact element={<DiscountStatusComponent />} />
						<Route path="/membership/discount/:id" exact element={<DiscountPercentComponent />} />
						<Route path="/membership/cost/:id" exact element={<MembershipCostComponent />} />
						<Route path="/search/:title" exact element={<Search />} />
						<Route path="/order" element={<OrderFormComponent />} />
						<Route path="/advancedsearchresult" element={<AdvancedSearchResultComponent />} />
						<Route path="/orderhistory" element={<OrderHistoryComponent />} />
						<Route path="*" exact element={<NotFound />} />
					</Routes>
				</UserContext.Provider>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
