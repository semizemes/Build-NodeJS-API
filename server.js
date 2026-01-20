import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import sendJSONResponse from "./utils/sendJSONResponse.js";
import { getDataByPathParams } from "./utils/getDataByPathParams.js";

const PORT = process.env.PORT || 8000
const destinations = await getDataFromDB();

const server = http.createServer((req, res) => {
  if (req.url === "/api" && req.method === "GET") {
    sendJSONResponse(res, 200, destinations);
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const continent = req.url.split("/").pop().replace(/-/g, " ");

    sendJSONResponse(res, 200, getDataByPathParams(destinations, "continent", continent));
  } else if(req.url.startsWith("/api/country") && req.method === "GET"){
    const country = req.url.split('/').pop().replace(/-/g, " ")

    sendJSONResponse(res, 200, getDataByPathParams(destinations, "country", country))
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
