const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyNHdoNWExMjAyQGJ2cml0aHlkZXJhYmFkLmVkdS5pbiIsImV4cCI6MTc4MjM4MDE3NiwiaWF0IjoxNzgyMzc5Mjc2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTUwNzNiYTAtYmY2Yi00YWMwLWJkMTYtZTNhM2U0NjhhNDQ2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW1tYSBzcmloYXJzaGEgIiwic3ViIjoiNjYwNTI3OTEtYTdjYi00MjhiLTg2ZDctNjNhNGU1N2RlODJlIn0sImVtYWlsIjoiMjR3aDVhMTIwMkBidnJpdGh5ZGVyYWJhZC5lZHUuaW4iLCJuYW1lIjoiYW1tYSBzcmloYXJzaGEgIiwicm9sbE5vIjoiMjR3aDVhMTIwMiIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6IjY2MDUyNzkxLWE3Y2ItNDI4Yi04NmQ3LTYzYTRlNTdkZTgyZSIsImNsaWVudFNlY3JldCI6ImNEeGVRYVVXR21yV2F2d3AifQ.-u8xTqlj6bqbU2a5OJBWCrWh9bG2JPP5x2LW0CiwE_k";

async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

module.exports = Log;