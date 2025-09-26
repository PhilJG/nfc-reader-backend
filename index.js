const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Store taps in memory (in a real app, use a database)
const tapHistory = [];

// Endpoint to get tap history
app.get("/api/taps", (req, res) => {
  res.json(tapHistory);
});

// Endpoint to receive tap data
app.post("/api/taps", (req, res) => {
  const tapData = {
    ...req.body,
    timestamp: new Date().toISOString(),
  };

  tapHistory.unshift(tapData); // Add to beginning of array
  if (tapHistory.length > 50) tapHistory.pop(); // Keep only last 50 taps

  console.log("Received tap:", tapData);
  res.status(201).json(tapData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
