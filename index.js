/* eslint-disable no-unused-vars */
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const checker = require("./src/verifiyLiscence");

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", (req, res, next) => {
	next();
});
app.get("/", (req, res, next) => {
	res.send("Hello");
});
app.post("/license", async (req, res, next) => {
	try {
		// console.log("data: ", req.body.regNo);
		const value = await checker(req.body.regNo);
		res.send(value);
	} catch (error) {
		console.log(error.message);
	}
});
app.use("/", (req, res, next) => {
	res.send("<h1> first midleware: Hello Tutorials Point </h1>");
});
const server = http.createServer(app);
server.listen(8000);
