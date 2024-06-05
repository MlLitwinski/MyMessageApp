const express = require("express");

const UserControler = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserControler.createUser);

router.post("/login", UserControler.userLogin);

module.exports = router;
