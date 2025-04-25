import 'reflect-metadata';
import { AppDataSource } from './utils/data-source';
import { startConsumer } from './rabbit/consumer';

AppDataSource.initialize().then(() => {
  console.log('User service ready');
  startConsumer();
});