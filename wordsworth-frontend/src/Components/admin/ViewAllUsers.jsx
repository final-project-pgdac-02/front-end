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
			{loggedInAdminOrNot && <Navigate to="/forbidden" />}
			<div className="card" style={{ margin: 70 }}>
				<table className="table align-middle mb-0 bg-white table-striped table-hover text-center">
					<thead className="thead-dark">
						<tr>
							<th scope="col" className="lead fs-3">
								ID
							</th>
							<th scope="col" className="lead fs-3">
								Name
							</th>
							<th scope="col" className="lead fs-3">
								Email
							</th>
							<th scope="col" className="lead fs-3">
								Phone No.
							</th>
							<th scope="col" className="lead fs-3">
								Role
							</th>
							<th scope="col" className="lead fs-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="fs-5 lead">
						{userList.map((value, key) => {
							return (
								<tr>
									<td>{value.id}</td>
									<td>{value.firstName}</td>
									<td>{value.email}</td>
									<td>{value.phone}</td>
									<td>{value.role}</td>
									<td>
										<button
											type="button"
											class="btn btn-danger"
											onClick={() => showDeleteModal(value.id, value.role)}
										>
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<DeleteConfirmation
					showModal={displayConfirmationModal}
					confirmModal={onDeleteAUserClick}
					hideModal={hideConfirmationModal}
					UID={userId}
				/>
			</div>
		</>
	);
}
export default ViewAllUsers;