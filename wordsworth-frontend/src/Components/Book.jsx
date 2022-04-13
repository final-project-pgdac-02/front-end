import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from 'react-router'
import axios from 'axios';
import BookDetailsComponent from './BookDetailsComponent';
const Book = () => {

    useEffect(()=>{
		getBookDetails();
	},[]);

    let {id} = useParams();

    const [bookDetail, setBookDetail] = useState();
    const [loading, setLoading] = useState(false);

    const getBookDetails=async ()=>{

		try{
			const res= await axios.get(`http://localhost:8080/books/${id}`);
			setBookDetail(res.data);
			setLoading(true);
		}catch(err){
			alert(err);
		}
		
	};

    return (
    <div>
            {
                    loading &&
							<BookDetailsComponent book={bookDetail} />
			}
    </div>
  )
}

export default Book