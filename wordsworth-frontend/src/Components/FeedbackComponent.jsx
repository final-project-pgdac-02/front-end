import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FeedbackComponent = (props) => {

    const feedbackRating = props.feedback.rating;

    const abc=`panelsStayOpen-collapseOne${props.feedback.id}`
    const abcTarget=`#${abc}`


    return (
		<div>
			<div className="accordion-item">
				<h2 className="accordion-header" id="panelsStayOpen-headingOne">
					{/* <h2 className="accordion-header" id={id1}> */}
					<button
						className="accordion-button "
						type="button"
						data-bs-toggle="collapse"
						data-bs-target={abcTarget}
						aria-expanded="true"
						aria-controls={abc}
					>
						<strong>
							{props.feedback.reviewerName}
							&nbsp; &nbsp; &nbsp;&nbsp;
						</strong>
						{[...Array(parseInt(feedbackRating))].map((e, i) => (
							<div>
                                &nbsp;
								<FontAwesomeIcon key={i} icon={faStar} />
							</div>
						))}
					</button>
				</h2>
				<div id={abc} className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
					<div className="accordion-body">{props.feedback.review}</div>
				</div>
			</div>
		</div>
	);
}

export default FeedbackComponent