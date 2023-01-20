import React, { useEffect, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";

const AdminLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup
        .string()
        .min(6, "password must have atlest 6 charecters")
        .required(),
    }),
    onSubmit: async (values) => {
      await axios
        .post("http://localhost:4500/server/adminLogin", {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          localStorage.setItem("token", response.data.token);
          if (response.status === 200) {
            return navigate("/admin/dashboard", {
              state: { email: response.data.result[0].email },
            });
          }
        });
    },
  });
  //   console.error(formik.errors);

  const nameerror = formik.touched.email && formik.errors.email && (
    <Form.Text className="text-muted text-danger" style={{ color: "red" }}>
      {formik.errors.email}
    </Form.Text>
  );
  const passerror = formik.touched.password && formik.errors.password && (
    <Form.Text className="text-muted" style={{ color: "red" }}>
      {formik.errors.password}
    </Form.Text>
  );

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  //for get all metting which have been created
  const checkAdmin = async () => {
    try {
      const response = await fetch("http://localhost:4500/server/getadmin");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      setIsLoading(false);
      // console.log(response.status);
      if (response.status === 400) {
        return navigate("/admin/signup");
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      checkAdmin();
    }, 1000);
  }, []);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Form className="form" onSubmit={formik.handleSubmit}>
        <h1>Admin Login</h1>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {nameerror}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {passerror}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br />
      <br />
      <Button
        variant="primary"
        onClick={() => {
          navigate("/admin/signup");
        }}
      >
        Go to signup page
      </Button>
    </div>
  );
};

export default AdminLogin;
