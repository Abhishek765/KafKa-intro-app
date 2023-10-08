const { Kafka } = require("kafkajs");
const { KAFKA_CLIENT_ID, SYSTEM_PRIVATE_IP } = require("./constant");

const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: [`${SYSTEM_PRIVATE_IP}:9092`],
});

module.exports = {
  kafka,
};
