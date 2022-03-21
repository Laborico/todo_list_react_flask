import React from "react";
import { Navbar, Container } from "react-bootstrap";
import './navbar.css'
import { logout } from "../../auth/index"

function PageNavbar(){
    
    return(
        <Navbar bg="ligth" fixed="top" className="remove-position">
            <Container fluid>
                <Navbar.Brand>ToDo List</Navbar.Brand>

                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text onClick={() => {
                        logout();
                        window.location.href = '/login'; 
                    }}>
                    <a>Logout</a>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default PageNavbar;