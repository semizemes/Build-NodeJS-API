import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import sendJSONResponse from "./utils/sendJSONResponse.js";
import { getDataByPathParams } from "./utils/getDataByPathParams.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();

  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const queryObj = Object.fromEntries(urlObj.searchParams);

  if (urlObj.pathname === "/api" && req.method === "GET") {
    let filteredData = destinations;

    const hasItem = Object.keys(queryObj).length > 0;
    console.log(queryObj);

    if (hasItem) {
      filteredData = filteredData.filter(
        (i) => i.country.toLowerCase() == queryObj.country.toLowerCase()
      );
      console.log(filteredData);
    }

    sendJSONResponse(res, 200, filteredData);
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const continent = req.url.split("/").pop().replace(/-/g, " ");

    sendJSONResponse(
      res,
      200,
      getDataByPathParams(destinations, "continent", continent),
    );
  } else if (req.url.startsWith("/api/country") && req.method === "GET") {
    const country = req.url.split("/").pop().replace(/-/g, " ");

    sendJSONResponse(
      res,
      200,
      getDataByPathParams(destinations, "country", country),
    );
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
