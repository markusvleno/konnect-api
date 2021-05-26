const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("signin");
});

module.exports = router;
