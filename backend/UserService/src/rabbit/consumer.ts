import amqp from 'amqplib';
import { authService } from '../services/authservice';
import { config } from 'dotenv';

config();

const Queue = process.env.Queue!;

export const startConsumer = async () => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
  const ch = await conn.createChannel();

  await ch.assertQueue(Queue);
 
  

  ch.consume(Queue, async (msg) => {
    if (!msg) return;

    console.log(msg.content.toString());

    try {
    const payload = JSON.parse(msg.content.toString());
    const { oper, body } = payload;
    let response;

    switch (oper) {
      case 'register':
        response = await authService.register(body);
        break;
      case 'login':
        response = await authService.login(body);
        break;
      case 'me':
        console.log(body.id);
        response = await authService.me(body.id);
        break;

      case 'refresh':
        response = await authService.refresh(body.refreshToken);
        break;
      case 'logout':
        response = await authService.logout(body.refreshToken); // или userId, если используешь blacklisting
        break;

      default:
        response = { error: 'Unknown operation' };
    }

    console.log(JSON.stringify(response));

        ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
      correlationId: msg.properties.correlationId,
    });

  } catch (error) {
    const err = error as Error;
     ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ error: err.message })), {
      correlationId: msg.properties.correlationId,
    });
  }

    ch.ack(msg);
  });
};