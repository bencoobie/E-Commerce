const router = require("express").Router();
const UserController = require("../controllers/userController");

router.post("/", UserController.create);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/:id", UserController.find);

module.exports = router;
