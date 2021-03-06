import React, { useState, useLayoutEffect } from "react";
import './home.css';
import {Row, Col, Button} from 'react-bootstrap';
import Time from '../time/time';
import PageNavbar from "../navbar/navbar";
import ModalForm from "../modalforms/newtask";
import TaskList from "../tasklist/tasklist";
import { authFetch } from "../../auth/index";

function Home(){

    const [show, setShow] = useState(false);
    const [userdata, setuserdata] = useState();

    const getid = async () => {
        const response = await authFetch("/api/v2/identity")
        .then(r => r.json())
        .then(res => {
            window.user_id = res.id
        })

        const response2 = await authFetch(
            "/api/v2/users?id=" + window.user_id
        ).then((response) => response.json())
         .then(res => {
             window.username = res.username
         })

         setuserdata(window.username);
    };

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);
    const handleSubmit =  async (name, desc) => {
        closeModal();

        let opts = {
            "user_id" : window.user_id,
            "task_name": name,
            "task_desc": desc
        }


        await authFetch("/api/v2/tasks", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            }, body: JSON.stringify(opts) })

        window.location.reload();
    };

    useLayoutEffect(async () => {
        await getid();
    }, []);

    return( {userdata } && 
        <Row className = "vh-100">
        <Col md={9}>
            <div className = "centered">
                <PageNavbar></PageNavbar>

                <Row className='spaced'>
                    <Col md={9}>
                        <h1 className="text text-centered">
                            Welcome {window.username} !
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
                {userdata && <TaskList></TaskList>}

                <Row className='footer'>
                    <Col md={12}>
                        <p className="text text-centered">
                            Developed by Laborico. Copyleft &#127279;. Made for Fun:)
                        </p>
                    </Col>
                </Row>


            </div>
        </Col>
        <Col md={3} className="date-hour text text-centered center-items">
            <Time></Time>
        </Col>
    </Row>
    );
}

export default Home;