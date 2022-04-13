import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Row, Col } from "react-bootstrap";
import BookCardComponent from './BookCardComponent';
import InfoTextComponent from './user/InfoTextComponent';

const AdvancedSearchResultComponent = () => {

  const query=new URLSearchParams(useLocation().search);

  let location=useLocation();

  useEffect(()=>{
		getFilteredBookList();
	},[location]);

  
  const category=query.get("category");
  const rating=query.get("rating");
  const min=query.get("min");
  const max=query.get("max");

  const [filteredBookList, setFilteredBookList]=useState([]);
  const [loading, setLoading] = useState(false);

    const getFilteredBookList=async()=>{
      const res=await axios.get(`http://localhost:8080/books/advanced?category=${category}&rating=${rating}&min=${min}&max=${max}`);
      console.log(res.data);
      setFilteredBookList(res.data);
      setLoading(true);
    }

    let foundText=` results found matching your query:`;
    // foundText+=`${rating?`\nRating: ${rating} and above`:""}`; 
    // foundText+=`${min?`\nMinimum Price: ${min}`:""}`; 
    // foundText+=`${max?`\nMaximum Price: ${max}`:""}`; 
    const notFoundText="Sorry! No matching results found   ";
  
    return (
      <div>
            <Row className="g-4 m-2">
                {loading && 
                        filteredBookList.length===0
                        ?<InfoTextComponent text={notFoundText} />
                        :<InfoTextComponent foundResults={filteredBookList.length} text={foundText} />
                }
                {
                    loading && filteredBookList.length!==0 && filteredBookList.map((book, i) => (
                        <Col key={i}>
                            <BookCardComponent key={i} book={book} />
                            {/* {book.bookTitle} */}
                        </Col>
                    ))
                }
            </Row>
        </div>
    // <div>AdvancedSearchResultComponent
    // <h2>{query.get("category")}</h2>
    // <h2>{query.get("rating")}</h2>
    // <h2>{query.get("min")}</h2>
    // <h2>{query.get("max")}</h2>

    // </div>
  )
}

export default AdvancedSearchResultComponent