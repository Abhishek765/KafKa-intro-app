const { kafka } = require("./client");
const readline = require("readline");
const { KAFKA_RIDER_TOPIC } = require("./constant");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("connecting producer...");
  await producer.connect();
  console.log("Producer connected successfully");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [riderName, location] = line.split(" ");
    await producer.send({
      topic: KAFKA_RIDER_TOPIC,
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1, // setting the partition according to consumer location
          key: "location-update",
          value: JSON.stringify({ name: riderName, location }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
}

init();
