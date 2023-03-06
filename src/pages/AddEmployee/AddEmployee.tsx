import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";

export const AddEmployee = ({ token }: any) => {
  const [submitted, setSubmitted] = useState(false);
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryBirthdate, setBeneficiaryBirthdate] = useState("");
  const [beneficiaryGender, setBeneficiaryGender] = useState("");
  const [beneficiaryRelationship, setBeneficiaryRelationship] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [status, setStatus] = useState(true);
  const [dateHire, setDateHire] = useState("");
  const [photo, setPhoto] = useState("");

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
      }
    let formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('position', position)
    formData.append('salary', salary.toString())
    formData.append('satatus', status ? 'True' : 'False')
    formData.append('date_of_hire', dateHire)
    formData.append('photo', photo)
    formData.append('beneficiary', JSON.stringify(beneficiary))

      console.log(formData)
    
    axios.post('http://localhost:8000/api/employees/create/', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${token}`
        }
    })
    .then((res) => {
        console.log(res)
        setSubmitted(true)
    })
    .catch((err) => console.log('Error', err))
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
