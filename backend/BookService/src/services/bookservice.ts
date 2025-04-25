import { AppDataSource } from '../utils/data-source';
import { Book } from '../entities/Book';

export const bookService = {
  async getAll() {
    const repo = AppDataSource.getRepository(Book);
    return await repo.find();
  },

  async getById(id: number) {
    const repo = AppDataSource.getRepository(Book);
    return await repo.findOneBy({ id });
  },

  async create(data: Partial<Book>) {
    const repo = AppDataSource.getRepository(Book);
    const book = repo.create(data);
    return await repo.save(book);
  },

  async update(id: number, updates: Partial<Book>) {
    const repo = AppDataSource.getRepository(Book);
    await repo.update(id, updates);
    return await repo.findOneBy({ id });
  },
};