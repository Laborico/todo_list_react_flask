import React from "react";
import { Navbar, Container } from "react-bootstrap";
import './navbar.css'

function PageNavbar(){
    return(
        <Navbar bg="ligth" fixed="top" className="remove-position">
            <Container fluid>
                <Navbar.Brand>ToDo List</Navbar.Brand>

                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Logout
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default PageNavbar;