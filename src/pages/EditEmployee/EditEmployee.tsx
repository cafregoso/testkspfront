import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import EmployeeDataService from '../../services/employees'

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

export const EditEmployee = ({ token }: any) => {
  const id = useParams().id;
  const [employee, setEmployee] = useState({
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
    }
  })

  useEffect(() => {
    EmployeeDataService.getEmployee(token, id).then((res) => {
      setEmployee(res.data)
    })
    .catch((err) => console.log(err))
  }, [id, token]);

  const [submitted, setSubmitted] = useState(false);
  const [beneficiaryName, setBeneficiaryName] = useState(employee.beneficiary.name);
  const [beneficiaryBirthdate, setBeneficiaryBirthdate] = useState(employee.beneficiary.birthdate);
  const [beneficiaryGender, setBeneficiaryGender] = useState(employee.beneficiary.gender);
  const [beneficiaryRelationship, setBeneficiaryRelationship] = useState(employee.beneficiary.relationship);

  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [position, setPosition] = useState(employee.position);
  const [salary, setSalary] = useState(employee.salary);
  const [status, setStatus] = useState(employee.status);
  const [dateHire, setDateHire] = useState(employee.date_of_hire);
  const [photo, setPhoto] = useState(employee.photo);

  const handleName = (e: any) => {
    e.target.name === "name"
      ? setName(e.target.value)
      : setBeneficiaryName(e.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePosition = (e: any) => {
    setPosition(e.target.value);
  };
  const handleSalary = (e: any) => {
    setSalary(e.target.value);
  };
  const handleStatus = (e: any) => {
    setStatus(e.target.checked);
  };
  const handleDate = (e: any) => {
    e.target.name === "date_of_hire"
      ? setDateHire(e.target.value)
      : setBeneficiaryBirthdate(e.target.value);
  };
  const handleImage = (e: any) => {
    setPhoto(e.target.files[0]);
  };
  const handleBeneficiaryGender = (e: any) => {
    setBeneficiaryGender(e.target.value);
  };
  const handleBeneficiaryRelationship = (e: any) => {
    setBeneficiaryRelationship(e.target.value);
  };

  const handleSubmit = async () => {
    const beneficiary = {
      name: beneficiaryName,
      birthdate: beneficiaryBirthdate,
      gender: beneficiaryGender,
      relationship: beneficiaryRelationship,
    };
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("position", position);
    formData.append("salary", salary.toString());
    formData.append("satatus", status ? "True" : "False");
    formData.append("date_of_hire", dateHire);
    formData.append("photo", photo);
    formData.append("beneficiary", JSON.stringify(beneficiary));

    console.log(formData);

    await EmployeeDataService.updateEmployee(token, id?.toString(), formData)
      .then((res) => {
        console.log(res);
        setSubmitted(true);
      })
      .catch((err) => console.log("Error", err));
  };

  return (
    <Container>
      {submitted ? (
        <>
          <h4>Employee created successfully</h4>
          <Link to={"/"}>Back to Home</Link>
        </>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Create a new employee</Form.Label>
            <Form.Control
              type="text"
              required
              name="name"
              placeholder="Complete Name"
              value={name}
              onChange={handleName}
            />
            <Form.Control
              type="email"
              required
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
            />
            <Form.Control
              type="text"
              required
              name="position"
              placeholder="Position"
              value={position}
              onChange={handlePosition}
            />
            <Form.Control
              type="number"
              required
              name="salary"
              placeholder="Salary"
              value={salary}
              onChange={handleSalary}
            />
            <Form.Check
              type="checkbox"
              required
              name="status"
              label="Status"
              checked={status}
              onChange={handleStatus}
            />
            <Form.Control
              type="date"
              required
              name="date_of_hire"
              placeholder="Date of Hire"
              value={dateHire}
              onChange={handleDate}
            />
            <Form.Control
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              required
              name="photo"
              placeholder="Photo"
              onChange={handleImage}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Beneficiary Information</Form.Label>
            <Form.Control
              type="text"
              required
              name="benficiaryName"
              placeholder="Complete Name"
              value={beneficiaryName}
              onChange={handleName}
            />
            <Form.Control
              type="date"
              required
              name="birthdate"
              value={beneficiaryBirthdate}
              onChange={handleDate}
            />
            <Form.Control
              type="text"
              required
              placeholder="Gender"
              name="gender"
              value={beneficiaryGender}
              onChange={handleBeneficiaryGender}
            />
            <Form.Control
              type="text"
              required
              placeholder="Ralationship"
              name="relationship"
              value={beneficiaryRelationship}
              onChange={handleBeneficiaryRelationship}
            />
          </Form.Group>
          <Button variant="info" onClick={handleSubmit}>
            Create employee
          </Button>
        </Form>
      )}
    </Container>
  );
};
