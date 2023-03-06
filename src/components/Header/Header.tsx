import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

export const Header = ({ user, logout, token }: any) => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>Employees</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Nav.Link as={Link} className="nav-link" to={"/"}>
                Employees
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link
                    as={Link}
                    className="nav-link"
                    to={"/"}
                    onClick={logout}
                  >
                    Logout ({user})
                  </Nav.Link>
                  <Nav.Link className="nav-link" href="http://localhost:8000/api/download/">
                    Download registry
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} className="nav-link" to={"/login"}>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} className="nav-link" to={"/signup"}>
                    Sing Up
                  </Nav.Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>
    </>
  );
};
