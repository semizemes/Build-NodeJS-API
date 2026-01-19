import http from 'node:http'
import { getDataFromDB } from './database/db.js'

const PORT = 8000;
const destinations = await getDataFromDB();

const server = http.createServer((req, res) => {
    if (req.url === "/api" && req.method === "GET") {
        res.end(JSON.stringify(destinations))
    }
})

server.listen(PORT, ()=> {
    console.log(`server is running on http://localhost:${PORT}`);
})