import React, { useState , useLayoutEffect } from "react";
import {Accordion, Container, Button, Row, Col} from 'react-bootstrap';
import ModalForm from "../modalforms/edittasks";
import './tasklist.css'
import { authFetch } from "../../auth/index";


function TaskList() {

    const [taskdata, setTaskData] = useState();
    const [show, setShow] = useState(false);
    const [taskid, setTaskId] = useState();

    const getid = async () => {
        const response = await authFetch("/api/v2/identity")
        .then(r => r.json())
        .then(res => {
            window.user_id = res.id
        })
    };

    const getApiData = async () => {
        const response = await authFetch(
            "/api/v2/tasks?user_id=" + window.user_id
        ).then((response) => response.json());
        

        setTaskData(response);
    };

    const openModal = (e) => {
        setTaskId(e.target.getAttribute('taskid'))
        setShow(true);
    }
    const closeModal = () => setShow(false);

    const editTask = async (id, name, description) => {
        closeModal();

        let opts = {
            "task_id" : id,
            "task_name": name,
            "task_desc": description
        }


        await authFetch("/api/v2/tasks", {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json'
        }, body: JSON.stringify(opts) })

        window.location.reload();
    }

    const deleteTask = async (e) => {
        let task_id = e.target.getAttribute('taskid')
        
        await authFetch("/api/v2/tasks?task_id=" + task_id, {
            method: 'DELETE',
        })

        window.location.reload();
    }

    useLayoutEffect(async () => {
        await getid();
        getApiData();
      }, []);
    
    return(
        <Container className="task-list">
            <Accordion defaultActiveKey="0">
                {taskdata && Object.keys(taskdata).length === 0 && <p className="text-centered"> You dont't have any pending task:) </p>}
                {taskdata && Object.keys(taskdata).map((key) => {
                    return (
                        <Accordion.Item key={taskdata[key].task_id} eventKey={taskdata[key].task_id} className="acc-item">
                            <Accordion.Header as="div">{taskdata[key].task_name}</Accordion.Header>
                            
                            <Accordion.Body key={taskdata[key].task_id}>

                                {taskdata[key].task_desc}

                                <Row>
                                    <Col md={12} className="buttons justify-content-end">
                                        <Button variant="primary" taskid = {key} key={taskdata[key].task_id} onClick={openModal} >
                                            Edit Task
                                        </Button>

                                        <Button variant="danger" taskid = {taskdata[key].task_id} key={taskdata[key].task_id} onClick={deleteTask}>
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
