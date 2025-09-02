const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'audit-service',
  brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();

async function sendAuditEvent(event) {
  await producer.connect();
  await producer.send({
    topic: 'audit-events',
    messages: [{ value: JSON.stringify(event) }]
  });
  await producer.disconnect();
}

module.exports = sendAuditEvent;
