require("dotenv").config();
const app = require("./app");
const db = require("./config/config");
const PORT = process.env.PORT || 4600;

db.connect((err) => {
  if (err) throw err;
  console.log("connection established");
});

app.listen(PORT, () => {
  console.log(`server is running port http://localhost:${PORT}`);
});
