import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Row, Col } from "react-bootstrap";
import axios from 'axios';
import BookCardComponent from './BookCardComponent';
import InfoTextComponent from './user/InfoTextComponent';
import { useLocation } from 'react-router-dom'
import AdvancedSearchComponent from './AdvancedSearchComponent';

const Search = () => {

    const { title } = useParams();

    let location=useLocation();

    const [matchingBookList, setMatchingBookList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getSearchResults();
    }, [location]);

    const getSearchResults = async () => {
        console.log(title);
        // const { title } = useParams();
        const res = await axios.get(`http://localhost:8080/books/title/${title}`);
        setMatchingBookList(res.data);
        setLoading(true);
    }

    const foundText="Here are the search results matching your search for:  ";
    const notFoundText="Sorry! No matching results found for:   ";

    return (
        <div>
            <Row className="g-4 m-2">
                {loading && 
                        matchingBookList.length===0
                        ?<InfoTextComponent text={notFoundText} title={title} />
                        :<InfoTextComponent text={foundText} title={title}/>
                }
                </Row>
                <Row>
                {
                    loading && matchingBookList.length!==0 && matchingBookList.map((book, i) => (
                        <Col key={i}>
                            <BookCardComponent key={i} book={book} />
                        </Col>
                    ))
                }

            </Row>
        </div>
    )
}


export default Search