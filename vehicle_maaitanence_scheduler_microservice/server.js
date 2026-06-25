const express = require("express");
const axios = require("axios");
const optimizeVehicles = require("./scheduler");
const Log = require("./log");

const app = express();
app.use(express.json());


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyNHdoNWExMjAyQGJ2cml0aHlkZXJhYmFkLmVkdS5pbiIsImV4cCI6MTc4MjM4MDE3NiwiaWF0IjoxNzgyMzc5Mjc2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTUwNzNiYTAtYmY2Yi00YWMwLWJkMTYtZTNhM2U0NjhhNDQ2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW1tYSBzcmloYXJzaGEgIiwic3ViIjoiNjYwNTI3OTEtYTdjYi00MjhiLTg2ZDctNjNhNGU1N2RlODJlIn0sImVtYWlsIjoiMjR3aDVhMTIwMkBidnJpdGh5ZGVyYWJhZC5lZHUuaW4iLCJuYW1lIjoiYW1tYSBzcmloYXJzaGEgIiwicm9sbE5vIjoiMjR3aDVhMTIwMiIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6IjY2MDUyNzkxLWE3Y2ItNDI4Yi04NmQ3LTYzYTRlNTdkZTgyZSIsImNsaWVudFNlY3JldCI6ImNEeGVRYVVXR21yV2F2d3AifQ.-u8xTqlj6bqbU2a5OJBWCrWh9bG2JPP5x2LW0CiwE_k";

app.get("/schedule", async (req, res) => {
  try {
    await Log("backend", "info", "route", "Schedule API called");

    
    const depotsRes = await axios.get(
      "http://4.224.186.213/evaluation-service/depots",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    
    const vehiclesRes = await axios.get(
      "http://4.224.186.213/evaluation-service/vehicles",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    const depots = depotsRes.data.depots;
    const vehicles = vehiclesRes.data.vehicles;

    let results = [];

    for (let depot of depots) {
      const optimized = optimizeVehicles(
        vehicles,
        depot.MechanicHours
      );

      results.push({
        depotId: depot.ID,
        mechanicHours: depot.MechanicHours,
        maxImpact: optimized.maxImpact,
        selectedVehicles: optimized.selectedVehicles
      });
    }

    console.log("Final Results:", results);

    await Log("backend", "info", "service", "Scheduling completed");

    res.json(results);

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);

    await Log(
      "backend",
      "error",
      "handler",
      error.message
    );

    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("Vehicle Scheduler Running");
});

app.listen(3000, async () => {
  await Log("backend", "info", "service", "Server started");
  console.log("Running on port 3000");
});