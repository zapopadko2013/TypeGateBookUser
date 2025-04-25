import 'reflect-metadata';
import { AppDataSource } from './utils/data-source';
import { startConsumer } from './rabbit/consumer';

AppDataSource.initialize()
  .then(() => {
    console.log('Book service connected to DB');
    startConsumer();
  })
  .catch((error) => console.error(error));