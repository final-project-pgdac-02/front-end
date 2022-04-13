import { useEffect, useState } from "react";
import AdminService from "../../service/AdminService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Navigate, useNavigate } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirmation";


const ViewAllUsers = () => {

    const [userList, setUserList] = useState([]);
    const userRole = window.sessionStorage.getItem("sessionObjectRole");
    const loggedInUserID = window.sessionStorage.getItem("sessionObjectId");

    const [userId, setUserId] = useState(null);
    const [userROLE, setUserROLE] = useState(null);
    const [loggedInAdminOrNot, setLoggedInAdminOrNot] = useState(false);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);

    useEffect(()=>{
        if(loggedInUserID === null && userRole !== "ADMIN"){
            setLoggedInAdminOrNot(true);
            window.alert("log in as ADMIN");
        }
        else{

        }
    },[])

    const showDeleteModal = (uId, uRole) => {
        if (uRole !== "ADMIN") {
            setUserId(uId);
            setUserROLE(uRole);
            setDisplayConfirmationModal(true);
            // setUserAdminOrNot(false);
        }
        else {
            setDisplayConfirmationModal(false);
            // setUserAdminOrNot(true);
            window.alert("ADMIN USER cannot be deleted!!!");
        }
    };

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    let method1 = () => {
        AdminService.getAllUserList().then((response) => {

            setUserList(response.data);

        }).catch((error) => {
            console.log("found error", error);
        })
    }
    useEffect(() => {
        method1();
    }, []);

    const onDeleteAUserClick = (id) => {
        if (userROLE !== "ADMIN") {
            AdminService.deleteAUser(id).then((response) => {

                method1();
            }).catch((error) => {
                console.log(error);
            })
            setDisplayConfirmationModal(false);

        }
        else {
            window.alert("ADMIN USER cannot be deleted!!!");
            setDisplayConfirmationModal(false);
        }

    }

    return (
        <>
            {loggedInAdminOrNot && <Navigate to="/login"/>}
            <div className="card" style={{ "margin": 70 }}>

                <table className="table align-middle mb-0 bg-white table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">ROLE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((value, key) => {

                            return (
                                <tr>
                                    <td>
                                        {key + 1}
                                    </td>
                                    <td>
                                        {value.firstName}
                                    </td>
                                    <td>
                                        {value.email}
                                    </td>
                                    <td>
                                        {value.phone}
                                    </td>
                                    <td>
                                        {value.role}
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger" onClick={() => showDeleteModal(value.id, value.role)}><FontAwesomeIcon icon={faTrash}  /></button>
                                    </td>
                                </tr>


                            )

                        })}

                    </tbody>
                </table>
                <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={onDeleteAUserClick} hideModal={hideConfirmationModal} UID={userId} />

            </div>
        </>

    );
}
export default ViewAllUsers;