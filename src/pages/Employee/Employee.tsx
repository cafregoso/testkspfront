import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import moment from "moment";

import EmployeeDataService from "../../services/employees";
import { Form } from "react-bootstrap";

interface EmployeeInt {
  id: string;
  name: string;
  email: string;
  position: string;
  salary: number;
  status: boolean;
  date_of_hire: string;
  photo: string;
  beneficiary: {
    name: string;
    birthdate: string;
    gender: string;
    relationship: string;
  };
}

export const Employee = ({ token }: any) => {
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false);
  const [submited, setSubmited] = useState(false);
  const id = useParams().id;
  const [employee, setEmployee] = useState<EmployeeInt>({
    id: "",
    name: "",
    email: "",
    position: "",
    salary: 0,
    status: true,
    date_of_hire: "",
    photo: "",
    beneficiary: {
      name: "",
      birthdate: "",
      gender: "",
      relationship: "",
    },
  });

  useEffect(() => {
    EmployeeDataService.getEmployee(token, id).then((res: any) => {
      setEmployee(res.data);
    });
  }, [id, token]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: e.target.type === "checkbox" ? e.target.checked : value,
    });
  };

  const handleBeneficiaryChange = (e: any) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      beneficiary: {
        ...prevState.beneficiary,
        [name]: value,
      },
    }));
  };

  const handleUpdate = async () => {
    const beneficiary = {
      name: employee.beneficiary.name,
      birthdate: employee.beneficiary.birthdate,
      gender: employee.beneficiary.gender,
      relationship: employee.beneficiary.relationship,
    };
    let formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("position", employee.position);
    formData.append("salary", employee.salary.toString());
    formData.append("satatus", employee.status ? "True" : "False");
    formData.append("date_of_hire", employee.date_of_hire);
    formData.append("photo", employee.photo);
    formData.append("beneficiary", JSON.stringify(beneficiary));

    await EmployeeDataService.createEmployee(token, formData)
      .then((res) => {
        console.log(res);
        setSubmited(true);
      })
      .catch((err) => console.log("Error", err));
  };

  const handleEdit = () => {
    setEdit(true)
  }

  const handleDelete = async (id: string) => {
    await EmployeeDataService.deleteEmployee(token, id).then((res) => {
      alert('Employee Deleted Successfully')
      navigate('/')
    })
  }

  return (
    <Container className="mt-3">
      {edit ? (
        submited ? (
          <>
            <h4>Employee updated successfully</h4>
            <Link to={"/"}>Back to Home</Link>
          </>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Update employee</Form.Label>
              <Form.Control
                type="text"
                required
                name="name"
                placeholder="Complete Name"
                value={employee.name}
                onChange={handleChange}
              />
              <Form.Control
                type="email"
                required
                name="email"
                placeholder="Email"
                value={employee.email}
                onChange={handleChange}
              />
              <Form.Control
                type="text"
                required
                name="position"
                placeholder="Position"
                value={employee.position}
                onChange={handleChange}
              />
              <Form.Control
                type="number"
                required
                name="salary"
                placeholder="Salary"
                value={employee.salary}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                required
                name="status"
                label="Status"
                checked={employee.status}
                onChange={handleChange}
              />
              <Form.Control
                type="date"
                required
                name="date_of_hire"
                placeholder="Date of Hire"
                value={employee.date_of_hire}
                onChange={handleChange}
              />
              <Form.Control
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                required
                name="photo"
                placeholder="Photo"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Beneficiary Information</Form.Label>
              <Form.Control
                type="text"
                required
                name="name"
                placeholder="Complete Name"
                value={employee.beneficiary.name}
                onChange={handleBeneficiaryChange}
              />
              <Form.Control
                type="date"
                required
                name="birthdate"
                value={employee.beneficiary.birthdate}
                onChange={handleBeneficiaryChange}
              />
              <Form.Control
                type="text"
                required
                placeholder="Gender"
                name="gender"
                value={employee.beneficiary.gender}
                onChange={handleBeneficiaryChange}
              />
              <Form.Control
                type="text"
                required
                placeholder="Ralationship"
                name="relationship"
                value={employee.beneficiary.relationship}
                onChange={handleBeneficiaryChange}
              />
            </Form.Group>
            <Button variant="info" onClick={handleUpdate}>
              Update employee
            </Button>
          </Form>
        )
      ) : (
        <Card style={{ width: "70%", margin: "20px auto" }} className="mb-3">
          <Card.Img
            style={{ maxWidth: "50%", margin: "20px auto" }}
            variant="top"
            src={employee.photo}
          />
          <Card.Body>
            <Card.Title>{employee.name}</Card.Title>
            <Card.Text>
              <b>ID:</b> {employee.id}
            </Card.Text>
            <Card.Text>
              <b>Email:</b> {employee.email}
            </Card.Text>
            <Card.Text>
              <b>Position:</b> {employee.position}
            </Card.Text>
            <Card.Text>
              <b>Salary:</b> {employee.salary}
            </Card.Text>
            <Card.Text>
              <b>Status:</b>{" "}
              {employee.status === true
                ? "Active"
                : "This user is not working here any more!"}
            </Card.Text>
            <Card.Text>
              <b>Date of hiring:</b>{" "}
              {moment(employee.date_of_hire).format("Do MMMM YYYY")}
            </Card.Text>
            <Card.Body>
              <Card.Text>
                <b>Beneficiary Information:</b>
              </Card.Text>
              <Card.Text>
                <b>Name: </b> {employee.beneficiary.name}
              </Card.Text>
              <Card.Text>
                <b>Relationship: </b> {employee.beneficiary.relationship}
              </Card.Text>
              <Card.Text>
                <b>Gender: </b> {employee.beneficiary.gender}
              </Card.Text>
              <Card.Text>
                <b>Birthdate: </b>{" "}
                {moment(employee.beneficiary.birthdate).format("Do MMMM YYYY")}
              </Card.Text>
            </Card.Body>
            <Button
              variant="outline-info"
              className="me-2"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};
