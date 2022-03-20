import React from "react";
import './home.css';
import {Row, Col} from 'react-bootstrap';
import Time from '../time/time';

function Home(){
    return(
        <Row className = "vh-100">
            <Col md={9}>
                <h1>
                    Test
                </h1>
            </Col>
            <Col md={3} className="date-hour">
                <Time></Time>
            </Col>
        </Row>
    );
}


export default Home;