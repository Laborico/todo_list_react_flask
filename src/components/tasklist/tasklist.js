import React, { useState , useEffect } from "react";
import {Accordion, Container, Button, Row, Col} from 'react-bootstrap';
import ModalForm from "../modalforms/edittasks";
import './tasklist.css'

function TaskList() {

    const [taskdata, setTaskData] = useState();
    const [show, setShow] = useState(false);
    const [taskid, setTaskId] = useState();

    const getApiData = async () => {
        const response = await fetch(
            "http://127.0.0.1:5000/api/v1/tasks?user_id=1"
        ).then((response) => response.json());
    
        setTaskData(response);
    };

    const openModal = (e) => {
        setTaskId(e.target.getAttribute('taskid') - 1)
        setShow(true);
    }
    const closeModal = () => setShow(false);

    const editTask = async (id, name, description) => {
        console.log(id, name, description)
        closeModal();
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("Edit Works"), 100)
        });
    
        let result = await promise

        alert(result);
    }

    const deleteTask = async () => {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("Delete Works"), 100)
        });
    
        let result = await promise

        alert(result);
    }

    useEffect(() => {
        getApiData();
      }, []);
    
    return(
        <Container className="task-list">
            <Accordion defaultActiveKey="0">
                {taskdata && Object.keys(taskdata).map((key, index) => {
                    return (
                        <Accordion.Item key={taskdata[index].task_id} eventKey={taskdata[index].task_id} className="acc-item">
                            <Accordion.Header as="div">{taskdata[index].task_name}</Accordion.Header>
                            
                            <Accordion.Body key={taskdata[index].task_id}>

                                {taskdata[index].task_desc}

                                <Row>
                                    <Col md={12} className="buttons justify-content-end">
                                        <Button variant="primary" taskid = {taskdata[index].task_id} key={taskdata[index].task_id} onClick={openModal} >
                                            Edit Task
                                        </Button>

                                        <Button variant="danger" taskid = {taskdata[index].task_id} key={taskdata[index].task_id} onClick={deleteTask}>
                                            Delete Task
                                        </Button>
                                    </Col>
                                </Row>

                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}

                { show ? 
                    <ModalForm 
                        closeModal={closeModal} 
                        isOpen={show} 
                        handleSubmit={editTask}
                        data = {taskdata[taskid]}
                    /> 
                    : null 
                } 

            </Accordion>
        </Container>
    );
}

export default TaskList
