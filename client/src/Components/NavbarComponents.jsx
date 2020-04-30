import React from 'react'
import { Navbar, Nav, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Logo from "../assets/img/logo.png"
export default () => {
  return (
    <Navbar bg="info" variant="light">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Entertain Me
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/movies" className="mx-1">
          <Button variant="light">Movies</Button>
        </Link>
        <Link to="/tv"  className="mx-1">
          <Button  variant="light">Tv Series</Button>
        </Link>
      </Nav>
    </Navbar>
  );
}