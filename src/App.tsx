import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout/Layout";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/SignUp/Signup";
import { Home } from "./pages/Home/Home";

import EmployeeDataService from "./services/employees";

import "bootstrap/dist/css/bootstrap.min.css";
import { Employee } from "./pages/Employee/Employee";
import { AddEmployee } from "./pages/AddEmployee/AddEmployee";
import { EditEmployee } from "./pages/EditEmployee/EditEmployee";

function App() {
  const [user, setUser] = useState(
    !localStorage.getItem("user") ? null : localStorage.getItem("user")
  );
  const [token, setToken] = useState(
    !localStorage.getItem("token") ? null : localStorage.getItem("token")
  );
  const [error, setError] = useState("");

  const login = async (user: any) => {
    await EmployeeDataService.login(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
        setError("");
      })
      .catch((err) => {
        console.log("login", error);
        setError(err.toString());
      });
  };

  const logout = () => {
    setToken("");
    setUser("");
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  };

  const signup = async (user: any) => {
    await EmployeeDataService.signup(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
      })
      .catch((err) => {
        console.log("signup", error);
        setError(err.toString());
      });
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Layout user={user} logout={logout} token={token} />}
          >
            <Route index element={<Home token={token} />} />
            <Route path="employee/create/" element={<AddEmployee token={token} />} />
            <Route path="employee/update/:id" element={<EditEmployee token={token} />} />
            <Route path="employee/:id/" element={<Employee token={token} />} />
            <Route path="login" element={<Login login={login} />} />
            <Route path="signup" element={<Signup signup={signup} />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
