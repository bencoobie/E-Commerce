const amqp = require("amqplib");

async function connect() {
  const connection = await amqp.connect(process.env.RABBIT_URI);
  console.log("Rabbit bağlandı");

  return await connection.createChannel();
}
module.exports = connect();
