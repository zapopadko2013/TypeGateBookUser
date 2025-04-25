import amqp from 'amqplib';
import { bookService } from '../services/bookservice';
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
      case 'getBooks':
        response = await bookService.getAll();
        break;
      case 'getBook':
        response = await bookService.getById(body.id);
        break;
      case 'createBook':
        response = await bookService.create(body);
        break;
      case 'updateBook':
        response = await bookService.update(body.id, body);
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