import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Loading from "../Loading";

const ShowCreatedMetting = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);
  if (isLoading) {
    return <Loading />;
  }

  //for delete metting
  const handleClick = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4500/server/deletemetting/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      const data = await response.json();
      alert(data.message);
      getData();
      // console.log(data);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  return (
    <div className="card p-3">
      <h2 className="text-center mb-3">Your Created Meeting List</h2>
      <div className="row">
        {data.map((card) => {
          // console.log(`"body data:" ${card}`);
          const { id, mtitle, mdate, mtime, mshift, booking } = card;
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
                  {booking === "0" ? (
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleClick(id);
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-success">
                        <strong>Meeting Booked</strong>
                      </div>
                      <div></div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowCreatedMetting;
