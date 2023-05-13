const router = require("express").Router();
const ProductController = require("../controllers/productController");
const UserController = require("../controllers/userController");

router.post("/", ProductController.create);
router.get("/", ProductController.load);
router.get("/:id", ProductController.find);
router.post("/:id", ProductController.update, ProductController.checkPrice);
router.get("/:productId/comments", ProductController.getComment);
router.get("/:productId/ratings", ProductController.getRating);
router.post("/:productId/addToBasket", UserController.itemToBasket);
router.post("/:productId/makeOrder", UserController.orderItem);
router.post("/:productId/makeComment", UserController.makeComment);
router.post("/:productId/rateProduct", UserController.rateProduct);
router.post("/:productId/addToWishList", UserController.itemToWishList);
module.exports = router;
