import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading";

const ViewsBookedMeetingList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state;

  //for get all booked metting list
  const getData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4500/server/getbookedallmetting"
      );
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      setIsLoading(false);
      const data = await response.json();
      //   console.log(data);
      setData(data);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="card mb-3">
        <div className="p-3 d-flex justify-content-between align-items-center">
          <div>
            <h1>List of booked meeting</h1>
          </div>
          <div>
            <Button
              className="me-3"
              variant="primary"
              onClick={() => {
                navigate("/admin/dashboard", {
                  state: { email: email },
                });
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/admin");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="card rounder">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Email of the user who made the booking</th>
              <th>Meeting Name</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const { id, email, mtitle, mdate, mtime, mshift } = item;
              return (
                <tr key={id}>
                  <td>{email}</td>
                  <td>{mtitle}</td>
                  <td>{mdate}</td>
                  <td>{`${mtime} ${mshift}`}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewsBookedMeetingList;
