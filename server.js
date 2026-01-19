import http from "node:http";
import { getDataFromDB } from "./database/db.js";

const PORT = 8000;
const destinations = await getDataFromDB();

const server = http.createServer((req, res) => {
  if (req.url === "/api" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    res.end(JSON.stringify(destinations));
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const finalUrl = req.url.split("/").pop();
    const filteredData = destinations.filter(
      (i) => i.continent.toLowerCase() == finalUrl.toLowerCase(),
    );
    res.setHeader("Content-Type", "application/json")
    res.statusCode = 200

    res.end(JSON.stringify(filteredData));
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        error: "not found",
        message: "The requested route does not exist",
      }),
    );
  }
});

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
