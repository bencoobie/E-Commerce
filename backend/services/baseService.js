class BaseService {
  constructor(model) {
    this.model = model;
  }

  async save(objects) {
    return this.model.insertMany(objects);
  }
  getOne(id, populate) {
    return this.model.findById(id).populate(populate);
  }

  async load() {
    return await this.model.find();
  }

  async insert(object) {
    return this.model.create(object);
  }

  async removeBy(property, value) {
    return this.model.deleteOne({ [property]: value });
  }

  async update(id, object) {
    return this.model.findByIdAndUpdate(id, object, { new: true });
  }

  async updateOne(objects) {
    return this.model.updateOne(objects, { new: true });
  }

  async findOneAndUpdate(condition, update) {
    return this.model.findOneAndUpdate(condition, update), { new: true };
  }

  async find(id, populate) {
    return await this.model.findById(id).populate(populate);
  }

  async findOne(property, value) {
    return this.model.findOne({ [property]: value });
  }

  async query(obj) {
    return this.model.find(obj);
  }

  async findBy(property, value) {
    return this.model.find({ [property]: value });
  }
}

module.exports = BaseService;
