const amqp = require("amqplib");
const rabbitMQ = require("../config/amqplib");
const BaseService = require("./baseService");
let channel = rabbitMQ.then((channel) => {
  return channel;
});

let consumerCreated = false;
let publisherCreated = false;

class NotificationService {
  constructor() {}

  async init() {
    this.connection = await amqp.connect(process.env.RABBIT_URI);
    console.log("Rabbit Bağlandı.");
    this.channel = await this.connection.createChannel();
    return this;
  }

  async getInstance() {
    if (!NotificationService.instance) {
      const broker = new NotificationService();
      NotificationService.instance = await broker.init();
    }
    return NotificationService.instance;
  }
  async createChannel() {
    if (!channel) {
      console.log("channel girdi");
    }
    return channel;
  }

  async send(queue, buffermsg) {
    const createdChannel = await channel;
    console.log("Queue isnmi", queue);
    console.log("Send çalıştı.", buffermsg.toString());

    return (await createdChannel).sendToQueue(queue, buffermsg);
  }

  async consume(queue, model, property, value) {
    if (!consumerCreated) {
      (await channel).assertQueue(queue);

      const user = new BaseService(model);
      const users = await user.findBy(property, value);
      if (!users) return;

      (await channel).consume(queue, async (cbmessage) => {
        console.log("Consumer çalıştı.", cbmessage.content.toString());

        (await channel).ack(cbmessage);
        for (let currentUser of users) {
          await currentUser.notifications.push(cbmessage.content.toString());
          await currentUser.save();
        }
      });
      consumerCreated = true;
    }
  }
}
module.exports = new NotificationService();
