const router = require("express").Router();

router.get("/", (req, res) => {
    try {
        
        res.clearCookie("_token", { path: "/" });
        return res.redirect("/login");
    } catch (e) {
        return res.redirect("/login");
    }
});

module.exports = router;
