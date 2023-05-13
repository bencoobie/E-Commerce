const UserService = require("../services/userService");
const ProductService = require("../services/productService");
const BaseController = require("../controllers/baseController");
const AuthService = require("../services/authService");

class UserController extends BaseController {
  constructor(service) {
    super(service);
  }

  async login(req, res) {
    const user = await UserService.login(req.body.email, req.body.password);
    if (user == null) {
      res.status(401).json({ message: "Email or password wrong" });
    } else {
      await new AuthService(user).authUser(req.session);
      console.log(req.session);
      res.status(200).json({ message: "Successfully logged in" });
    }
  }

  async logout(req, res) {
    await new AuthService().destroyAuth(req.session);
    res.clearCookie("sessionID");
    res.status(200).json({ message: "Successfully logged out" });
  }

  async itemToBasket(req, res) {
    if ((await new AuthService().checkSession(req.session)) == false)
      return res.status(401).json({ message: "Please login" });
    await UserService.addItemToBasket(req.session, req.params.productId);

    res.status(200).json({ message: "Başarıyla sepete eklendi." });
  }

  async itemToWishList(req, res) {
    if ((await new AuthService().checkSession(req.session)) == false)
      return res.status(401).json({ message: "Please login" });
    await UserService.addItemToWishList(req.session, req.params.productId);
    res.status(200).json({ message: "Başarıyla istek listesine eklendi." });
  }

  async orderItem(req, res) {
    await UserService.makeOrder(req.session, {
      _id: req.params.productId,
    });
    await ProductService.makeOwner(req.params.productId, req.session.user._id);

    res.status(200).json({ message: "Başarıyla sipariş verildi." });
  }

  async makeComment(req, res) {
    await UserService.makeComment(req.session, req.params.productId, req.body);
    res.status(200).json({ messaghe: "Başarıyla yorum yapıldı." });
  }

  async rateProduct(req, res) {
    await UserService.rateProduct(req.session, req.params.productId, req.body);
    res.status(200).json({ messaghe: "Başarıyla puanlama yapıldı." });
  }
}

module.exports = new UserController(UserService);
