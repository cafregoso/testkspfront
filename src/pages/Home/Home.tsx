import React, { useState, useEffect } from "react";
import EmployeeDataService from "../../services/employees";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import moment from 'moment'

export const Home = ({ token }: any) => {
  const [empployees, setEmployees] = useState([]);

  useEffect(() => {
    const retrieveTodos = () => {
      EmployeeDataService.getAll(token)
        .then((response: any) => {
          setEmployees(response.data);
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    retrieveTodos();
  }, [token]);

  return (
    <Container>
      {token == null || token === "" ? (
        <Alert variant="warning">
          You are not logged in. Please <Link to={"/login"}>login</Link> to see the information.
        </Alert>
      ) : (
        <div>
          <Link to={"/employee/create/"}>
            <Button variant="outline-info" className="mb-3 mt-3">
              Add Employee
            </Button>
          </Link>
          {empployees.map((employee: any) => {
            return (
              <Card key={employee.id} className="mb-3">
                <Card.Body>
                  <div>
                    <Card.Title>{employee.name}</Card.Title>
                    <Card.Text>
                      <b>Email:</b> {employee.email}
                    </Card.Text>
                    <Card.Text>Date of hiring: <strong>{moment(employee.date_of_hire).format("Do MMMM YYYY")}</strong></Card.Text>
                  </div>
                  <Link
                    to={{
                      pathname: `/employee/${employee.id}`
                    }}
                  >
                    <Button variant="outline-info" className="me-2">
                      View Details
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
};
