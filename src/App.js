import React, { useState } from "react";
import Lookup from "./components/Lookup";
import Result from "./components/Result";
import useAPIresponse from "./CustomHooks/useApiresponse";
import { Navbar, Container, Nav, Button, Offcanvas } from "react-bootstrap";
import "./App.css";

function App() {
  const { results, performSearch } = useAPIresponse();
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClose = () => setShowDrawer(false);
  const handleShow = () => setShowDrawer(true);

  return (
    <div className="app-bg">
      {/* Top Navbar */}
      <Navbar bg="light" className="shadow-sm">
        <Container>
          <Button variant="outline-primary" onClick={handleShow}>
            ☰ Menu
          </Button>
          <Navbar.Brand className="ms-3" style={{ color: "red" }}>
            Search App
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Drawer (Offcanvas Menu) - Always Available */}
      <Offcanvas show={showDrawer} onHide={handleClose} backdrop="true">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Trending</Nav.Link>
            <Nav.Link href="#">Favorites</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <Container className="py-4">
        <Lookup onSearch={performSearch} />
        <Result results={results} />
      </Container>

      {/* Bottom Navigation */}
      <nav className="bottom-nav d-flex justify-content-around align-items-center shadow-lg bg-danger">
        <Button variant="link text-white text-decoration-none">Home</Button>
        <Button variant="link text-white text-decoration-none">Explore</Button>
        <Button variant="link text-white text-decoration-none">Profile</Button>
      </nav>
    </div>
  );
}

export default App;
