const { kafka } = require("./client");
const { KAFKA_RIDER_TOPIC } = require("./constant");
const group = process.argv[2]; // taking consumer group from terminal

async function init() {
  const consumer = kafka.consumer({ groupId: group });

  //Connecting Consumer...
  await consumer.connect();

  // Subscribe consumer to a topic
  await consumer.subscribe({
    topics: [KAFKA_RIDER_TOPIC],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: ({ topic, message, partition }) => {
      console.log(
        `TOPIC:${topic}, PARTITION:${partition}`,
        message.value.toString()
      );
    },
  });
}

init();
