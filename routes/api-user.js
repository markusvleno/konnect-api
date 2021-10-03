const router = require("express").Router();
const UserModel = require("../model/users");
// const { isNotLoggedIN } = require("../utils/authentication");
// const { validateCookie } = require("../utils/cookie");

router.post("/", async (req, res) => {
    res.status(401).send({ message: "only GET mothod is allowed" });
});

router.get("/", async (req, res) => {
    try {
        const { username, userId } = req.query;

        if (!username && !userId) {
            return res.status(200).send({ code: 400, message: "Insufficient query" });
        }

        if (username) {
            UserModel.findOne({ username: username }, (err, docs) => {
                if (err) return res.status(200).send({ code: 502, message: "database error", rawError: err });

                if (!docs) return res.status(200).send({ code: 404, message: "user not found!" });
                else {
                    const data = {
                        userId: docs._id,
                        username: docs.username,
                        name: docs.name,
                    };
                    res.status(200).send({ code: 200, message: "success", data: data });
                }
            });
        } else if (userId) {
            UserModel.findById(userId, (err, docs) => {
                if (err) return res.status(200).send({ code: 502, message: "database error", rawError: err });

                if (!docs) return res.status(200).send({ code: 404, message: "user not found!" });
                else {
                    const data = {
                        userId: docs._id,
                        username: docs.username,
                        name: docs.name,
                    };
                    res.status(200).send({ code: 200, message: "success", data: data });
                }
            });
        } else {
            res.status(200).send({ code: 502, message: "Invalid" });
        }
    } catch (error) {
        res.status(200).send({ code: 502, message: error });
    }
});

module.exports = router;
