import React from "react";
import { NavLink } from "react-router-dom";
import { OverlayTrigger,Tooltip } from "react-bootstrap";

const MembershipComponent = (props) => {

	return (
		<div className="text-decoration-none lead">
			<div className="col mx-5 my-2">
				<div className="card shadow h-100 bg-light">
					<h5 className="card-title lead fs-3 text-center card-header">{props.membership.membershipType}</h5>
					<div className="card-body">
						<ul className="list-group list-group-flush">
							<OverlayTrigger placement={"top"} overlay={<Tooltip>Edit Discount %</Tooltip>}>
								<NavLink
									to={"/membership/discount/" + props.membership.id}
									className="text-decoration-none"
								>
									<li className="shadow-sm list-group-item rounded-3 m-2 border-0">
										<div className="row card-text">
											<div className="col-6 text-start">Discount</div>
											<div className="col-6 text-end">{props.membership.discount} %</div>
										</div>
									</li>
								</NavLink>
							</OverlayTrigger>
							<OverlayTrigger placement={"top"} overlay={<Tooltip>Edit Membership Cost</Tooltip>}>
								<NavLink
									to={"/membership/cost/" + props.membership.id}
									className="text-decoration-none"
								>
									<li className="shadow-sm list-group-item rounded-3 m-2 border-0">
										<div className="row card-text">
											<div className="col-6 text-start">Cost</div>
											<div className="col-6 text-end">{props.membership.membershipCost} ₹</div>
										</div>
									</li>
								</NavLink>
							</OverlayTrigger>
						</ul>
					</div>
					<OverlayTrigger placement={"top"} overlay={<Tooltip>Edit Discount Status</Tooltip>}>
						<div className="card-footer">
							<small className="text-muted">
								<NavLink to={"/membership/status/" + props.membership.id}>
									<div className="form-check row form-switch  d-flex justify-content-center">
										<input
											className="form-check-input fs-3"
											type="checkbox"
											role="switch"
											defaultChecked={props.membership.discountIsActive}
											disabled
										/>
									</div>
								</NavLink>
							</small>
						</div>
					</OverlayTrigger>
				</div>
			</div>
		</div>
	);
};

export default MembershipComponent;
