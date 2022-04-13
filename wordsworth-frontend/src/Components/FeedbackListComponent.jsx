import React from 'react'
import FeedbackComponent from './FeedbackComponent'
import { useEffect, useState } from "react";
import axios from 'axios';

const FeedbackListComponent = (props) => {

  useEffect(()=>{
		getFeedbackList();
	},[]);


    const [loading, setLoading] = useState(false);
    const [feedbackList,setFeedbackList]= useState([]);
  
    const getFeedbackList=async ()=>{
  
      try{
        const res= await axios.get(`http://localhost:8080/feedbacks/${props.bookId}`);
        console.log(res.data);
        setFeedbackList(res.data);
        setLoading(true);
      }catch(err){
        alert(err);
      }
    };



  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
        {/* <FeedbackComponent />*/}

        {
					loading && feedbackList.map((feedback,i)=>(
              <FeedbackComponent key={i} feedback={feedback} />
					))
				}
    </div>
  )
}

export default FeedbackListComponent