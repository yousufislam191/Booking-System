import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import ShowCreatedMetting from "./ShowCreatedMetting";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state;

  const time = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const shift = ["am", "pm"];

  const [metting, setmetting] = useState({
    mtitle: "",
    mdate: startDate,
    mtime: "",
    mshift: "",
  });
  const { mtitle, mdate, mtime, mshift } = metting;

  const inputHandle = (e) => {
    const fieldName = e.target.name;

    if (fieldName === "meetingTitle") {
      setmetting({ mtitle: e.target.value, mdate, mtime, mshift });
      console.log(e.target.value);
    } else if (fieldName === "selectTime") {
      setmetting({ mtitle, mdate, mtime: e.target.value, mshift });
      console.log(e.target.value);
    } else if (fieldName === "ampm") {
      setmetting({ mtitle, mdate, mtime, mshift: e.target.value });
      console.log(e.target.value);
    }
  };

  const handleDateChange = (startDate) => {
    // console.log(startDate);
    setStartDate(startDate);
  };

  const submitHandler = async (e) => {
    // console.log(metting);
    e.preventDefault();
    await axios
      .post("http://localhost:4500/server/createmetting", {
        mtitle: metting.mtitle,
        mdate: metting.mdate,
        mtime: metting.mtime,
        mshift: metting.mshift,
      })
      .then((response) => {
        // console.log(response);
        alert(response.data.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="container">
      <div className="card mb-3">
        <div className="p-3 d-flex justify-content-between align-items-center">
          <div>
            <h2>Welcome to Admin Dashboard</h2>
            <h6>Admin Email : {email}</h6>
          </div>
          <div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3 card p-3 col-8">
          <h3 className="text-center mb-3">Create Metting</h3>
          <Form onSubmit={submitHandler}>
            <div className="d-flex align-items-center mb-3 gap-3">
              <h6 className="">Meeting Title : </h6>
              <div>
                <input
                  type="text"
                  name="meetingTitle"
                  id="meetingTitle"
                  value={mtitle}
                  onChange={inputHandle}
                  required
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3 gap-3">
              <h6 className="">Select Date : </h6>
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  minDate={new Date()}
                  name="dateFormat"
                  required
                  isClearable
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3 gap-3">
              <h6 className="">Select Time : </h6>
              <div className="d-flex align-items-center mb-3 gap-3">
                <Form.Select
                  aria-label="Default select example"
                  name="selectTime"
                  value={mtime}
                  onChange={inputHandle}
                  required
                >
                  <option selected disabled value="">
                    Time
                  </option>
                  {time.map((option) => (
                    <option>{option}</option>
                  ))}
                </Form.Select>
                <Form.Select
                  aria-label="Default select example"
                  name="ampm"
                  value={mshift}
                  onChange={inputHandle}
                  required
                >
                  <option selected disabled value="">
                    Shift
                  </option>
                  {shift.map((option) => (
                    <option>{option}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <Button variant="primary" type="submit">
              Create metting
            </Button>
          </Form>
        </div>
        <div className="col-4 text-center mt-5">
          <Button
            variant="primary"
            onClick={() => {
              navigate("/admin/bookedmeetinglist", {
                state: { email: email },
              });
            }}
          >
            View Booked Metting List
          </Button>
        </div>
      </div>
      <div className="">
        <ShowCreatedMetting />
      </div>
    </div>
  );
};

export default Dashboard;
