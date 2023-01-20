import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import Loading from "../Loading";
import { useLocation, useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [data, setData] = useState([]);
  const [userBookedData, setUserBookedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { state } = useLocation();
  const { user_id, email } = state;

  //for get all metting which have been created
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:4500/server/getmetting");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      setIsLoading(false);
      const data = await response.json();
      // console.log(data);
      setData(data);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  //for get user booked metting
  const userBookedMeetingData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4500/server/getuserbookedmetting/${user_id}`,
        { method: "PATCH" }
      );
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      // console.log(`user booked data: ${JSON.stringify(data)}`);
      setUserBookedData(data);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getData();
      userBookedMeetingData();
    }, 1000);
  }, []);
  if (isLoading) {
    return <Loading />;
  }

  //for bookeds metting
  const handleClick = async (user_id, meetingid) => {
    // console.log(`user_id: ${user_id}, meetingid:${meetingid}`);
    try {
      const response = await fetch(
        `http://localhost:4500/server/bookedmetting/${meetingid}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user_id }),
        }
      );
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      alert(data.message);
      getData();
      userBookedMeetingData();
      // console.log(data);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card mb-3">
        <div className="p-3 d-flex justify-content-between align-items-center">
          <div>
            <h2>Welcome to User Dashboard</h2>
            <h6>User Email : {email}</h6>
          </div>
          <div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>
      <div className="rounded card ">
        <h2 className="mb-3 mt-3 text-center">
          List of meetings created by admin
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Meeting Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Booking Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((card) => {
              const { id, mtitle, mdate, mtime, mshift, booking } = card;
              return (
                <tr key={id}>
                  <td>{mtitle}</td>
                  <td>{mdate}</td>
                  <td>{`${mtime} ${mshift}`}</td>
                  <div className="text-center">
                    {booking === "0" ? (
                      <Button
                        variant="primary"
                        onClick={() => {
                          handleClick(user_id, id);
                        }}
                      >
                        Book now
                      </Button>
                    ) : (
                      <Button disabled variant="secondary">
                        Booked
                      </Button>
                    )}
                  </div>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="p-3 mt-3 card">
        <h1 className="text-center mb-3">Your Created Meeting List</h1>
        <div className="row">
          {userBookedData.map((item) => {
            // console.log(`"body data:" ${card}`);
            const { id, mtitle, mdate, mtime, mshift } = item;
            return (
              <div className="col-lg-3 col-6 mb-3" key={id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{mtitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <strong>Date : </strong> {mdate}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Time : </strong>
                      {`${mtime}  ${mshift}`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
