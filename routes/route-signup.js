const router = require("express").Router();
const createUser = require("../utils/createuser");
const CredentialModel = require("../model/credential");

//entry
router.post("/", (req, res) => {
    //createUser(req.body);
    res.status(600).send({ message: "registerd" });
});

module.exports = router;
