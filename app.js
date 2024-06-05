const {
	log,
} = require("@angular-devkit/build-angular/src/builders/ssr-dev-server");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose
	.connect(
		"mongodb+srv://mmlitwinscy:" +
			process.env.MONGO_ATLAS_PW + // process.env.MONGO_ATLAS_PW
			"@cluster0.il7ttvg.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0"
	)
	.then(() => {
		console.log("Conected to database");
	})
	.catch(() => {
		console.log("Conection faild");
	});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/", express.static(path.join(__dirname, "angular/browser")));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-Width, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, OPTIONS"
	);
	next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, "angular/browser", "index.html"));
});

module.exports = app;
