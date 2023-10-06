const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");

const server = express();
const feedbacksRoute = require("./routes/feedbacks.routes")

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static("public"));
server.use(cors());

server.use("/api/v1/feedbacks", feedbacksRoute);



const port = 3000
server.listen(port, () => {
    console.log(`Example server listening on port ${port}`)
})