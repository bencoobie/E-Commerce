const UserService = require("../services/userService");
const ProductService = require("../services/productService");
const BaseController = require("../controllers/baseController");
const AuthService = require("../services/authService");
var mongoose = require("mongoose");

class ProductController extends BaseController {
  constructor(service) {
    super(service);
  }
  async getComment(req, res) {
    res.status(200).json({
      comments: await ProductService.getComment(
        new mongoose.Types.ObjectId(req.params.productId),
        "owners"
      ),
    });
  }

  async checkPrice(req, res) {
    await ProductService.isPriceChanged(req.params.productId);
  }
  async getRating(req, res) {
    res.status(200).json({
      ratings: await ProductService.getRating(
        new mongoose.Types.ObjectId(req.params.productId),
        "owners"
      ),
    });
  }
}

module.exports = new ProductController(ProductService);
