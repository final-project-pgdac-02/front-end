import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import UserService from "../../service/UserService";
// import logo from '../../W_Logo.png'
import WSvgComponent from "./WSvgComponent";
import '../../Mysnackbar.css';	


const Login = () => {


    useEffect(() => {
    window.scrollTo(0,0);
    }, [])
    

    let svgprops = {
		opacity: "1",
		width: "100%",
	};

	const { state, dispatch } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [loginAsUser, setLoginAsUser] = useState(false);
	const [loggedInAsAdmin, setLoggedInAsAdmin] = useState(false);

	let navigate = useNavigate();

	const snackBar1 = window.sessionStorage.getItem("snackbar1");
	const snackbar2 = window.sessionStorage.getItem("snackbar2");
	const [show,setShow] = useState("");
	const [show1,setShow1] = useState("");

	useEffect(()=>{
		window.scrollTo(0,0);
	if(snackBar1 === "show"){
		console.log(snackBar1);
		setShow("show");
		setTimeout(function() {
			setShow(""); 
			clearTimeout();

		},3000 )
		window.sessionStorage.removeItem("snackbar1");
	}

	if(snackbar2 === "show"){
		setShow1("show");
		setTimeout(function() {
			setShow1("");
			clearTimeout();
		},3000)
		window.sessionStorage.removeItem("snackbar2");
	}
	},[]);


    let emailTextHandler = (event) => {
        setEmail(event.target.value);
		if(emailErr !== null || emailErr !== ""){
			setEmailErr("");
		}
        // console.log(email);
    }

    let passwordTextHandler = (event) => {
        setPassword(event.target.value);
		if(passwordErr !== null || passwordErr !== ""){
			setPasswordErr("");
		}
        // console.log(password);
    }

    let validation = () => {

        let emailFlag = true;
        let passwordFlag = true;
		

        if (email === null || email === "") {
            setEmailErr("This field is mandatory");
            emailFlag = false;
        }
        if (password === null || password === "") {
            setPasswordErr("This field is mandatory");
            passwordFlag = false;
        }

        if (emailFlag && passwordFlag) {
            return true;
        }
    }

    const OnLoginClick = (event) => {
        event.preventDefault();
        if (validation()) {
            setEmailErr("");
            setPasswordErr("");
            let loginRequest = { email, password };
            UserService.processLoginForm(loginRequest).then((response) => {
                console.log("login successfull", response.data);
                window.sessionStorage.setItem("sessionObjectId", response.data.id);
                window.sessionStorage.setItem("sessionObjectFirstName", response.data.firstName);
				window.sessionStorage.setItem("sessionObjectLastName",response.data.lastName);
                window.sessionStorage.setItem("sessionObjectEmail", response.data.email);
                window.sessionStorage.setItem("sessionObjectRole", response.data.role);

				window.sessionStorage.setItem("snackbar","show");

                // setLoginAsUser(true);

				if (response.data.role === "CUSTOMER") {
					console.log(response.data.role);
					dispatch({ type: "USER", payload: "user" });
					setLoginAsUser(true);
				}
				else if (response.data.role === "ADMIN") {
					console.log(response.data.role);
					dispatch({ type: "ADMIN", payload: "admin" });
					setLoggedInAsAdmin(true);
				}
            }).catch((error) => {
				window.alert("Invalid User Credentials");
                console.log("found error", error);
				alert("Login failed! Please check your credentials");
            })
        }
    }



    return (
		<>
			{loginAsUser && <Navigate to="/" />}
			{loggedInAsAdmin && <Navigate to="/admindashboard"/>}
			<br />
			<div className="m-3" style={{ display: "flex" }}>
				<div className="card p-2 col-3 mx-auto shadow" style={{ display: "block" }}>
					<div className="text-center">
						<WSvgComponent {...svgprops} />
					</div>

					<div className="text-center  text-muted p-1">
						Login to Wordsworth to get the most awesome collection of books
						<em> NOW!</em>
					</div>
					<div className="m-3">
						<form onSubmit={OnLoginClick}>
							<div className="mb-3 text-warning ">
								<label htmlFor="exampleInputEmail1" className="form-label fst-italic fw-bold">
									Email Address
								</label>
								<input
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Your Email Address"
									onChange={emailTextHandler}
									value={email}
								/>
								<span className="text-danger">{emailErr}</span>
							</div>
							<div className="mb-3 text-warning ">
								<label htmlFor="exampleInputPassword1" className="form-label fst-italic fw-bold">
									Password
								</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword1"
									placeholder="Your Password"
									onChange={passwordTextHandler}
									value={password}
								/>
								<span className="text-danger">{passwordErr}</span>
							</div>
							<div className="text-center ">
								<button type="submit" className="btn btn-warning fs-5">
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className={show} id="snackbar">LogOut Successfull</div>
				<div className={show1} id="snackbar">User Registered Successfull</div>
			</div>
		</>
	);
}
export default Login;