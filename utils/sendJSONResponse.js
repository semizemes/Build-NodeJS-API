export default function sendJSONResponse(response, statusCode, payload) {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Method", "GET")
  response.statusCode = statusCode;
  response.end(JSON.stringify(payload));
}
