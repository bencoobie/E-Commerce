const User = require("../model/User");
const BaseService = require("./baseService");
const AuthService = require("../services/authService");

class UserService extends BaseService {
  async login(email, password) {
    const user = await this.findOne("email", email);
    if (!user) return null;
    if (user.password != password) return null;
    else return user;
  }

  async addItemToWishList(session, productId) {
    const user = await this.find(session.user._id);
    if (!user) console.log("USER NOT FOUND.");
    else {
      await user.wishList.push(productId);
      await user.save();
    }
  }

  async addItemToBasket(session, productId) {
    const user = await this.find(session.user._id);
    if (!user) console.log("USER NOT FOUND.");
    else {
      await user.basket.push(productId);
      await user.save();
    }
  }
  async makeOrder(session, objects) {
    const user = await this.find(session.user._id);
    if (!user) console.log("USER NOT FOUND.");
    await user.orders.push(objects);
    await user.save();
  }

  async makeComment(session, productId, objects) {
    const user = await this.find(session.user._id);
    if (!user) console.log("USER NOT FOUND.");
    let order = await user.orders.find((order) => order._id == productId);
    if (!order)
      console.log("You have to own this product if you want to comment");
    order.comment = objects.comment;
    await user.save();
  }

  async rateProduct(session, productId, objects) {
    const user = await this.find(session.user._id);
    if (!user) console.log("USER NOT FOUND.");
    let order = await user.orders.find((order) => order._id == productId);
    if (!order) console.log("You have to own this product if you want to rate");
    order.rating = objects.rate;
    await user.save();
  }
}

module.exports = new UserService(User);
