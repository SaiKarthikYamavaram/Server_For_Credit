/* eslint-disable no-unused-vars */
require("dotenv").config();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const checker = require("./src/verifiyLiscence");
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/", (req, res, next) => {
	next();
});

app.get("/", (req, res, next) => {
	res.send("Hello");
});

app.post("/license", async (req, res, next) => {
	console.log("data: ", req.body);
	const value = await checker(req.body.regNo);
	res.send(value);
});

app.use("/", (req, res, next) => {
	res.send("<h1> first midleware: Hello Tutorials Point </h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("server running at", port));
