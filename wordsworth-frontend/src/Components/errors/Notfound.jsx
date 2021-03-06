import "./Notfound.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHeartBroken, faHouse } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";


const Notfound = () => {
    return (
		<div>
			<br />
			<br />
			<div className="card mx-auto shadow" style={{ width: "45%" }}>
				<div className="row g-0 d-flex flex-wrap align-items-center">
					<div className="card-body error-template">
						<h1 className="card-title display-1 text-center m-1 ">
							Oops{" "}
							<span className="text-danger">
								<FontAwesomeIcon icon={faHeartBroken} />
							</span>
						</h1>
						<br />
						<h2 className="display-4">404 Not Found!</h2>
						<div className="error-details lead">Sorry, an error has occured.</div>
						<div className="error-details lead">The requested page could not be found!</div>
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
}
export default Notfound;