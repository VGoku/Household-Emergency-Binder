// Backend entry: simple Express server for API endpoints
import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(3000, () => {
  console.log("Backend listening on port 3000");
});

