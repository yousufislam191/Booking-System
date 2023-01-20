const db = require("../config/config");

const createMetting = (req, res) => {
  const { mtitle, mdate, mtime, mshift } = req.body;
  const booking = "0";

  //this type of string substr = 2023-01-19T22:24:21.936Z
  const splitDate = mdate.substr(0, 10);
  // console.log(`split date: ${splitDate}`);

  if (!mtitle || !splitDate || !mtime || !mshift)
    return res.json({ message: "Please fill up the all input fields" });
  else {
    const chechQuery =
      "SELECT * FROM `meeting` WHERE mdate=? AND mtime=? AND mshift=?";
    const insertQuery =
      "INSERT INTO meeting(mtitle, mdate, mtime, mshift, booking) VALUES (?,?,?,?,?)";

    db.query(chechQuery, [splitDate, mtime, mshift], async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.status(200).json({
          message: "at the same time another meeting has been created",
        });
      } else {
        db.query(
          insertQuery,
          [mtitle, splitDate, mtime, mshift, booking],
          async (err, result) => {
            if (err) throw err;
            return res
              .status(201)
              .json({ message: "meeting created successfully" });
          }
        );
      }
    });
  }
};

const getMetting = (req, res) => {
  const getQuery = "SELECT * FROM meeting";
  db.query(getQuery, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    } else {
      if (result.length > 0) {
        return res.status(200).json(result);
      } else {
        return res
          .status(400)
          .json({ message: "not any meetin yet found in database" });
      }
    }
  });
};

const deleteMetting = (req, res) => {
  const userid = req.params.id;
  const deleteQuery = "DELETE FROM meeting WHERE id=?";
  db.query(deleteQuery, [userid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "meeting does not exist" });
      }
      return res.status(200).json({ message: "Delated meeting successfully" });
    }
  });
};

const bookedMetting = (req, res) => {
  const meetingid = req.params.id;
  const { user_id } = req.body;
  // console.log(`server user id: ${user_id}`);
  const booking = "1";
  const updateQuery = "UPDATE meeting SET booking=? WHERE id=?";
  db.query(updateQuery, [booking, meetingid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "meeting does not booked" });
      }

      //for which one booked meeting
      const insertQuery =
        "INSERT INTO booking_meeting(user_id, meeting_id) VALUES (?,?)";
      db.query(insertQuery, [user_id, meetingid], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          if (result.affectedRows == 0) {
            return res.status(404).json({ message: "meeting does not booked" });
          }
          return res.status(200).json({ message: "meeting booked" });
        }
      });
    }
  });
};

//To show the meetings that have been booked to the admin.
const getBookedAllMetting = (req, res) => {
  const getQuery =
    "SELECT * FROM `booking_meeting`,`meeting`, `user_info` WHERE meeting.id=meeting_id AND user_info.id=user_id";
  db.query(getQuery, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    } else {
      if (result.length > 0) {
        return res.status(200).json(result);
      } else {
        return res
          .status(400)
          .json({ message: "not any meetin yet found in database" });
      }
    }
  });
};

//To show the meetings that the user has booked
const getUserBookedMetting = (req, res) => {
  const user_id = req.params.id;
  const matchUserIdQuery = "SELECT * FROM `booking_meeting` WHERE id=?";
  const getQuery =
    "SELECT * FROM `booking_meeting`,`meeting`, `user_info` WHERE meeting.id=meeting_id AND user_info.id=user_id AND user_id=?";

  db.query(getQuery, [user_id], (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    } else {
      if (result.length > 0) {
        return res.status(200).json(result);
      } else {
        return res
          .status(400)
          .json({ message: "not any meetin yet found in database" });
      }
    }
  });
};

module.exports = {
  createMetting,
  getMetting,
  deleteMetting,
  bookedMetting,
  getBookedAllMetting,
  getUserBookedMetting,
};
