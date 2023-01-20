import React from "react";

import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
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
        .post("http://localhost:4500/server/adminRegister", {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          if (response.status === 201) {
            return navigate("/admin");
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

  return (
    <div className="container">
      <Form className="form" onSubmit={formik.handleSubmit}>
        <h1>Admin Register</h1>
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
          Register
        </Button>
      </Form>
      <br />
      <br />
      <Button
        variant="primary"
        onClick={() => {
          navigate("/admin");
        }}
      >
        Go to login page
      </Button>
    </div>
  );
};

export default Signup;
