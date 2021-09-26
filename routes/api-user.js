const router = require("express").Router();
const UserModel = require("../model/users");
const { isNotLoggedIN } = require("../utils/authentication");
const { validateCookie } = require("../utils/cookie");

router.post("/", async (req, res) => {
    res.status(401).send({ message: "only GET mothod is allowed" });
});

router.get("/", isNotLoggedIN, async (req, res) => {
    try {
        const { _token } = req.cookies;

        if (await !validateCookie(_token)) {
            return res.status(200).send({ code: 403, message: "Invalid cookie!" });
        }

        UserModel.findOne({ loginToken: _token }, (err, docs) => {
            if (err) return res.status(200).send({ code: 502, message: "database error", rawError: err });

            if (!docs) return res.status(200).send({ code: 404, message: "user not found!" });
            else {
                const config = {
                    userId: docs._id,
                    username: docs.username,
                    name: docs.name,
                    friendList: docs.friendList,
                };
                res.status(200).send({ code: 200, message: "success", data: config });
            }
        });
    } catch (error) {
        res.status(200).send({ code: 502, message: error });
    }
});

module.exports = router;
