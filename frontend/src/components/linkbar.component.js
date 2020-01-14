import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';


export default class LinkBar extends React.Component{

    render(){
        return (
            <Navbar bg="light" expand="lg">
              <Navbar.Brand>Note Taker</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">View Notes</Nav.Link>
                  <Nav.Link href="/create">Create Note</Nav.Link>
      
                </Nav>
              </Navbar.Collapse>
            </Navbar>);
    }

}