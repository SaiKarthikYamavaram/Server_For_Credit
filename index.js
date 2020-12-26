/* eslint-disable no-unused-vars */
require("dotenv").config();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const checker = require("./src/verifiyLiscence");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", cors(), (req, res, next) => {
	next();
});

app.get("/", cors(), (req, res, next) => {
	res.send("Hello");
});

app.post("/license", cors(), async (req, res, next) => {
	try {
		console.log("data: ", req.body.regNo);
		const value = await checker(req.body.regNo);
		res.send(value);
	} catch (error) {
		console.log(error.message);
	}
});

app.use("/", cors(), (req, res, next) => {
	res.send("<h1> first midleware: Hello Tutorials Point </h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("server running "));
