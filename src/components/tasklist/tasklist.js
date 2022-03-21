import React, { useState , useEffect } from "react";
import {Accordion, Container, Button, Row, Col} from 'react-bootstrap';
import './tasklist.css'

function TaskList() {

    const [taskdata, setTaskData] = useState();

    const getApiData = async () => {
        const response = await fetch(
            "http://127.0.0.1:5000/api/v1/tasks?user_id=1"
        ).then((response) => response.json());
    
        setTaskData(response);
    };

    const editTask = async () => {
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
                            
                            <Accordion.Body>

                                {taskdata[index].task_desc}

                                <Row>
                                    <Col md={12} className="buttons justify-content-end">
                                        <Button variant="primary" onClick={editTask}>Edit Task</Button>
                                        <Button variant="danger" onClick={deleteTask}>Delete Task</Button>
                                    </Col>
                                </Row>

                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        </Container>
    );
}

export default TaskList
