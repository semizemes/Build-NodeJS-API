import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import sendJSONResponse from "./utils/sendJSONResponse.js";

const PORT = 8000;
const destinations = await getDataFromDB();

const server = http.createServer((req, res) => {
  if (req.url === "/api" && req.method === "GET") {
    sendJSONResponse(res, 200, destinations);
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const finalUrl = req.url.split("/").pop();
    const filteredData = destinations.filter(
      (i) => i.continent.toLowerCase() == finalUrl.toLowerCase(),
    );

    sendJSONResponse(res, 200, filteredData);
  } else {
    sendJSONResponse(res, 404, {
      error: "not found",
      message: "The requested route does not exist",
    });
  }
});

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
