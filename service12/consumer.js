const { Kafka } = require('kafkajs');
const { insertEvent } = require('../cosmos/cosmosClient');

const kafka = new Kafka({
  clientId: 'audit-service',
  brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({ groupId: 'audit-group' });

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'audit-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      await insertEvent(event);
    }
  });
}

module.exports = startConsumer;
