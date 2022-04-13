import React from "react";
import WordsworthSvgComponent from "./WordsworthSvgComponent";

const Footer = () => {
    let props = {
		opacity: "0.5",
		width: "200",
	};
	return (
		<div>
			<footer className="bd-footer py-1 mt-5 bg-light text-muted">
				<div className="container py-5">
					<div className="row">
						<div className="col-lg-3 mb-1">
							<WordsworthSvgComponent {...props}/>
							<br />
							<ul className="list-unstyled small text-muted">
								<li className="mb-2">
									Designed and built with all the love in the world by the Project Group - 2
								</li>
							</ul>
						</div>
						<div className="col-6 col-lg-2 offset-lg-1 mb-3 ">
							<h5>Aashu Khare</h5>
							<h5>PRN: 200240120003</h5>
							<ul className="list-unstyled">
								{/* <li className="mb-2">
									<a href="#">200240120003</a>
								</li> */}
							</ul>
						</div>
						<div className="col-6 col-lg-2 mb-3">
							<h5>Ankit Agarwal</h5>
							<h5>PRN: 200240120028</h5>
							<ul className="list-unstyled">
								{/* <li className="mb-2">
									<a href="#">200240120028</a>
								</li> */}
							</ul>
						</div>
						<div className="col-6 col-lg-2 mb-3">
							<h5>Shivam Sharma</h5>
							<h5>PRN: 210940120188</h5>
							<ul className="list-unstyled">
								{/* <li className="mb-2">
									<a href="#">210940120188</a>
								</li> */}
							</ul>
						</div>
						<div className="col-6 col-lg-2 mb-3">
							<h5>Vibha G.</h5>
							<h5>PRN: 200240120220</h5>
							<ul className="list-unstyled">
								{/* <li className="mb-2">
									<a href="#">200240120220</a>
								</li> */}
							</ul>
						</div>
						<div className="text-center text-muted small">
							© {new Date().getFullYear()} Copyright: Wordsworth
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
