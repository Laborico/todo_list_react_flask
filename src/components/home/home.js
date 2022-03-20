import React from "react";
import './home.css';
import {Row, Col} from 'react-bootstrap';
import Time from '../time/time';
import Page_navbar from "../navbar/navbar";

function Home(){
    return(
        <Row className = "vh-100">
            <Col md={9}>
                <div className = "centered">
                    <Page_navbar></Page_navbar>
                </div>
            </Col>
            <Col md={3} className="date-hour">
                <Time></Time>
            </Col>
        </Row>
    );
}


export default Home;