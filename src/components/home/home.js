import React, { useState } from "react";
import './home.css';
import {Row, Col, Button} from 'react-bootstrap';
import Time from '../time/time';
import PageNavbar from "../navbar/navbar";
import ModalForm from "../modalform/modalform";
import TaskList from "../tasklist/tasklist";

function Home(){
    const [show, setShow] = useState(false);

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);
    const handleSubmit = () => {
        alert("Works")
    };


    return(
        <Row className = "vh-100">
            <Col md={9}>
                <div className = "centered">
                    <PageNavbar></PageNavbar>

                    <Row className='spaced'>
                        <Col md={9}>
                            <h1 className="text text-centered">
                                Welcome PLACEHOLDER!
                            </h1>
                        </Col>

                        <Col md={3} className="text center-items">
                            <Button variant="success" onClick={openModal}>Create new task</Button>

                            { show ? 
                                <ModalForm 
                                    closeModal={closeModal} 
                                    isOpen={show} 
                                    handleSubmit={handleSubmit}
                                /> 
                                : null 
                            }
                        </Col>
                    </Row>
                    
                    <Row className='spaced'>
                        <Col md={12}>
                            <h2 className="text text-centered">
                                Your ToDo List:
                            </h2>
                        </Col>
                    </Row>

                    <TaskList></TaskList>


                </div>
            </Col>
            <Col md={3} className="date-hour text text-centered center-items">
                <Time></Time>
            </Col>
        </Row>
    );
}


export default Home;