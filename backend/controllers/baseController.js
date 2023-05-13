const RedisService = require("../services/redisService");
const ProductService = require("../services/productService");
const NotificationService = require("../services/notificationService");
const User = require("../model/User");

class BaseController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res) => {
    await this.service.insert(req.body);
    res.status(200).json({ message: "Başarıyla oluşturuldu." });
  };

  load = async (req, res) => {
    let str = req.baseUrl;
    let parts = str.split("/");
    let key = parts[1];
    console.log(key);
    if (await RedisService.checkCache(key)) {
      const cachedData = await RedisService.getCachedData(key);
      return res.status(200).json({ data: cachedData });
    }
    console.log("DATA CACHELENMEDI");
    const nonCachedData = await this.service.load();
    await RedisService.cacheData(key, nonCachedData);
    return res.status(200).json({ data: nonCachedData });
  };

  update = async (req, res) => {
    console.log(await ProductService.isPriceChanged(req.params.id));

    await NotificationService.send(
      req.params.id,
      Buffer.from(`İstek listenizdeki  ürünün fiyatı düştü!`)
    );
    await NotificationService.consume(
      req.params.id,
      User,
      "wishList",
      req.params.id
    );

    this.service.update(req.params?.id || req.user?._id, req.body),
      res.status(200).json({ message: "Güncellendi." });
  };

  delete = async (req, res) => {
    this.service.removeBy("_id", req.params?.id);
  };

  find = async (req, res) => {
    const query = await this.service.find(req.params?.id);

    res.status(200).json({ message: query });
  };
}

module.exports = BaseController;
