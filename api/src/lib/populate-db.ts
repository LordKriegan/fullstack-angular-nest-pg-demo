import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { BookEntity as Book } from '../entities/book.entity';
import { ChapterEntity as Chapter } from '../entities/chapter.entity';
import { AuthorEntity as Author } from '../entities/author.entity';
import { faker } from '@faker-js/faker';
import { dbconfig } from '../config/dbconfig';

const dataSource = new DataSource(<DataSourceOptions> dbconfig);

const seedDb = async() => {
    try {
        await dataSource.initialize();
        const bookRepository = dataSource.getRepository(Book);
        const authorRepository = dataSource.getRepository(Author);
        const chapterRepository = dataSource.getRepository(Chapter);

        console.log("Starting database seeding...")

        for (let i = 0; i < 100; i++) {
            const newBook = bookRepository.create({
                bookName: faker.book.title(),
                pageCount: faker.number.int({ min: 1, max: 1000 }),
                description: faker.lorem.paragraph().slice(0, 500)
            })

            const savedBook = await bookRepository.save(newBook);

            const numAuthors: number = faker.number.int({min: 1, max: 3})
            for (let i = 0; i < numAuthors; i++) {
                const newAuthor = authorRepository.create({
                    book: savedBook,
                    author: faker.book.author()
                });
                await authorRepository.save(newAuthor);
            }
            const numChapters: number = faker.number.int({min: 1, max: 30})
            for (let i = 0; i < numChapters; i++) {
                const newChapter = chapterRepository.create({
                    book: savedBook,
                    chapterName: faker.book.title(),
                    description: faker.lorem.paragraph().slice(0, 500),
                    pageCount: faker.number.int({ min: 1, max: 100 })
                });
                await chapterRepository.save(newChapter);
            }
        }
        console.log("Completed seeding...")
    } catch (error) {
        console.error("Error while populating db: ", error);
        process.exit(1);
    }
}


seedDb()
