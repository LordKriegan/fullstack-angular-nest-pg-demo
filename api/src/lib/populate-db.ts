import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { BookEntity as Book } from '../entities/book.entity';
import { ChapterEntity as Chapter } from '../entities/chapter.entity';
import { faker } from '@faker-js/faker';
import { dbconfig } from '../config/dbconfig';

const dataSource = new DataSource(<DataSourceOptions>dbconfig)

const seedDb = async () => {
    try {
        await dataSource.initialize()
        console.log("Connected to database...");
        const bookRepository = dataSource.getRepository(Book);
        const chapterRepository = dataSource.getRepository(Chapter);

        console.log("Starting database population")
        for (let i = 0; i < 100; i++) {
            //create book
            const newBook = bookRepository.create({
                bookName: faker.book.title(),
                author: faker.book.author(),
                description: faker.lorem.paragraphs().slice(0, 500),
                pageCount: faker.number.int({ max: 750, min: 1 })
            });
            await bookRepository.save(newBook);

            //create random number of chapters
            const chapterCount = Math.floor((Math.random() * 30) + 1)
            for (let i = 0; i < chapterCount; i++) {
                const newChapter = chapterRepository.create({
                    chapterName: faker.book.title(),
                    pageCount: faker.number.int({ max: 100, min: 1 }),
                    description: faker.lorem.paragraphs().slice(0, 500),
                    book: newBook
                })
                await chapterRepository.save(newChapter);
            }
        }

        console.log("Completed database population...")
    } catch (error) {
        console.error("error seeding db: ", error)
        process.exit(1)
    }
}

seedDb()