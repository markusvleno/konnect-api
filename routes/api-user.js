const router = require("express").Router();
const UserModel = require("../model/users");

router.post("/", async (req, res) => {
    res.status(401).send({ message: "only GET mothod is allowed" });
});

router.get("/", (req, res) => {
    const { _token } = req.cookies;

    if (!_token) return res.redirect("/login");

    try {
        exist = UserModel.findOne({ loginToken: _token }, (error, result) => {
            if (error) {
                res.status(502).send({ code: 502 });
            } else {
                res.status(200).send({ code: 200, data: result });
            }
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
