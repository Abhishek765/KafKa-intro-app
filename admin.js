const { kafka } = require("./client");
const { KAFKA_RIDER_TOPIC } = require("./constant");

async function init() {
  const admin = kafka.admin();
  console.log("admin connecting...");
  await admin.connect();
  console.log("admin connected successfully");

  console.log("Creating topic...");
  //   topic creation
  await admin.createTopics({
    topics: [
      {
        topic: KAFKA_RIDER_TOPIC,
        numPartitions: 2,
      },
    ],
  });

  console.log(`Topic Created Success [${KAFKA_RIDER_TOPIC}]`);

  console.log("Disconnecting Admin...");
  await admin.disconnect();
  console.log("Admin Disconnected");
}

init();
