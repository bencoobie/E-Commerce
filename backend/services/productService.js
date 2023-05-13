const Product = require("../model/Product");
const BaseService = require("./baseService");
const mongoose = require("mongoose");
const UserService = require("./userService");
const NotificationService = require("../services/notificationService");

class ProductService extends BaseService {
  async makeOwner(productId, user) {
    const product = await this.find(productId);
    if (!product) console.log("Product didnt found.");
    await product.owners.push(user);
    await product.save();
  }

  async isPriceChanged(productId) {
    let message;
    const changeStream = await this.model.watch({
      _id: new mongoose.Types.ObjectId(productId),
    });

    await changeStream.on("change", async (change) => {
      if (change.operationType === "update") {
        const updatedFields = Object.keys(
          change.updateDescription.updatedFields
        );
        if (updatedFields.includes("price")) {
          const product = await mongoose
            .model("Product")
            .findOne({ _id: productId });
          (async () => {
            message = `Ürün fiyatı değişti: ${product.name} - ${product.price}`;
            console.log(message);
            return message;
          })();
        }
      }
    });
  }

  async getComment(productId, populate) {
    let comments = [];
    const product = await this.getOne(productId, populate);
    if (!product) console.log("Product didnt found.");
    //let comments = await product.owners[0].orders[0]._id;
    for (let i = 0; i < product.owners.length; i++) {
      for (let k = 0; k < product.owners[i].orders.length; k++) {
        if (
          product.owners[i].orders[k]._id.equals(productId) &&
          product.owners[i].orders[k].comment
        )
          comments.push(product.owners[i].orders[k].comment);
      }
    }
    return comments;
  }
  async getRating(productId, populate) {
    let rating = [];
    const product = await this.getOne(productId, populate);
    if (!product) console.log("Product didnt found.");
    //let comments = await product.owners[0].orders[0]._id;
    for (let i = 0; i < product.owners.length; i++) {
      for (let k = 0; k < product.owners[i].orders.length; k++) {
        if (
          product.owners[i].orders[k]._id.equals(productId) &&
          product.owners[i].orders[k].rating
        )
          rating.push(product.owners[i].orders[k].rating);
      }
    }
    return rating;
  }
}

module.exports = new ProductService(Product);
