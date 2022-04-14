import "./Notfound.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken, faHouse } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const ForbiddenAccess = () => {
	return (
		<div>
			<br />
			<br />
			<div className="card mx-auto shadow" style={{ width: "45%" }}>
				<div className="row g-0 d-flex flex-wrap align-items-center">
					<div className="card-body error-template">
						<h1 className="card-title display-1 text-center m-1 ">
							Oops
							<span className="text-danger">
								<FontAwesomeIcon icon={faHeartBroken} />
							</span>
						</h1>
						<br />
						<h2 className="display-4">403 Forbidden!</h2>
						<div className="error-details lead">Sorry!</div>
						<div className="error-details lead">
							The page you are trying to access is forbidden for you!
						</div>
						<div className="error-actions">
							<br />
							<NavLink to={"/"}>
								<button className="btn btn-light btn-lg">
									Take Me Home <FontAwesomeIcon icon={faHouse} />
								</button>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ForbiddenAccess;
