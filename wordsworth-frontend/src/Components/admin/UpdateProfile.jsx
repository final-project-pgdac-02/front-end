import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminService from "../../service/AdminService";


function UpdateProfile() {
    let navigate = useNavigate();
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");

    const getUserId = window.sessionStorage.getItem("sessionObjectId");
    useEffect(() => {
        if (getUserId === null) {
            alert("You need to login to Update Profile!");
            setNotLoggedIn(true);
        } else {
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        setId(getUserId);
        setRole(window.sessionStorage.getItem("sessionObjectRole"));
        setEmail(window.sessionStorage.getItem("sessionObjectEmail"));
    }, []);

    const [firstNameErr, setFirstNameErr] = useState("");
    const [lastNameErr, setLastNameErr] = useState("");
    const [phoneNumberErr, setPhoneNumberErr] = useState("");

    let firstNameTextHandler = (event) => {
        setFirstName(event.target.value);
        if (firstNameErr !== null || firstNameErr !== "") {
            setFirstNameErr("");
        }
        // console.log(firstName);
    };

    let lastNameTextHandler = (event) => {
        setLastName(event.target.value);
        if (lastNameErr !== null || lastNameErr !== "") {
            setLastNameErr("");
        }
        // console.log(lastName);
    };

    let phoneNumberTextHandler = (event) => {
        setPhoneNumber(event.target.value);
        if (phoneNumberErr !== null || phoneNumberErr !== "") {
            setPhoneNumberErr("");
        }
        // console.log(phoneNumber);
    };

    let validation = () => {
        let flag = true;

        if (firstName === null || firstName === "") {
            setFirstNameErr("This Field is Mandatory");
            flag = false;
        }

        if (lastName === null || lastName === "") {
            setLastNameErr("This Field is Mandatory");
            flag = false;
        }

        if (phoneNumber === null || phoneNumber === "") {
            setPhoneNumberErr("This Field is Mandatory");
            flag = false;
        }else if (phoneNumber.length > 10 || phoneNumber.length < 10) {
			setPhoneNumberErr("PhoneNumber must be 10 digit in length");
            flag = false;
		}

        if (flag) {
            return true;
        }
    };

    let OnUpdateAdminProfileClick = (e) => {
        e.preventDefault();
        if (validation()) {
            setFirstNameErr("");
            setLastNameErr("");
            setPhoneNumberErr("");

            let userObject = { firstName, lastName, "phone": phoneNumber };
            AdminService.updateProfile(id, userObject).then(response => {
                console.log("Profile Updated Successfully!!", response.data);
                window.alert("Profile Updated Successfully!!", response.data);
                navigate("/admindashboard");
            }).catch(error => {
                window.alert("Something went wrong", error);
            });
        }
    };
    return (
        <>
            {notLoggedIn && <Navigate to="/login" />}
            <br />
            <br />
            <div className="card mx-auto shadow" style={{ width: "45%" }}>
                <div className="row g-0 d-flex flex-wrap align-items-center">

                    <div className="card-body">
                        <h1 className="card-title display-4 text-center m-1 ">Update Profile </h1>
                        <hr />
                    </div>
                    <form onSubmit={OnUpdateAdminProfileClick}>
                        <div className="m-3 col-6 mx-auto ">
                            <label htmlFor="fname" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control fst-italic"
                                id="fname"
                                placeholder="William"
                                onChange={firstNameTextHandler}
                                value={firstName}
                            />
                            <span className="text-danger">{firstNameErr}</span>
                        </div>
                        <div className="m-3 col-6 mx-auto ">
                            <label htmlFor="lname" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control fst-italic"
                                id="lname"
                                placeholder="Wordsworth"
                                onChange={lastNameTextHandler}
                                value={lastName}
                            />
                            <span className="text-danger">{lastNameErr}</span>
                        </div>

                        <div className="m-3 col-6 mx-auto ">
                            <label htmlFor="em" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-control fst-italic"
                                placeholder="will.worth@gmail.com"
                                id="em"
                                value={email}
                                disabled
                            />
                        </div>

                        <div className="m-3 col-6 mx-auto ">
                            <label htmlFor="phn" className="form-label">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phn"
                                placeholder="9797979797"
                                pattern="[0-9]{10}"
                                onChange={phoneNumberTextHandler}
                                value={phoneNumber}
                            />
                            <span className="text-danger">{phoneNumberErr}</span>
                        </div>

                        <div className="m-3 col-6 mx-auto ">
                            <label htmlFor="role" className="form-label">
                                Role
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="role"
                                placeholder="Role"
                                value={role}
                                disabled
                            />
                        </div>

                        <div className="text-center col-5 mx-auto m-5">
                            <button type="submit" className="btn btn-warning btn-lg fs-3 fw-light">
                                    Update Profile
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}

export default UpdateProfile;