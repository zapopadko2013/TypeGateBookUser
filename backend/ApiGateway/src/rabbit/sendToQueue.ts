
import amqp from 'amqplib';
import crypto from 'crypto';
import { config } from 'dotenv';

config();

export const sendToQueue = async (queue: string, message: any) => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
  const ch = await conn.createChannel();

  const correlationId = crypto.randomUUID();
  const q = await ch.assertQueue('', { exclusive: true }); // Временная очередь для ответа

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Timeout: no response from queue'));
      ch.close();
      conn.close();
    },10000000); 

    ch.consume(
      q.queue,
      (msg) => {
        if (msg?.properties.correlationId === correlationId) {
          clearTimeout(timeout);
          const data = JSON.parse(msg.content.toString());
          resolve(data);
          ch.close();
          conn.close();
        }
      },
      { noAck: true }
    );

    ch.sendToQueue(`${queue}_in`, Buffer.from(JSON.stringify(message)), {
      correlationId,
      replyTo: q.queue, //  Сюда микросервис вернёт ответ
    });
  });
};
