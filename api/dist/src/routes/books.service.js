"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const book_entity_1 = require("../entities/book.entity");
const typeorm_2 = require("@nestjs/typeorm");
const faker_1 = require("@faker-js/faker");
let BooksService = class BooksService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async books() {
        return this.bookRepository.find();
    }
    async searchBooks(bookName, author, description, minPages, maxPages) {
        const findOptions = {};
        if (bookName) {
            findOptions.bookName = (0, typeorm_1.Like)(`%${bookName}%`);
        }
        if (author) {
            findOptions.author = (0, typeorm_1.Like)(`%${author}%`);
        }
        if (description) {
            findOptions.description = (0, typeorm_1.Like)(`%${description}%`);
        }
        if ((minPages === 0 || minPages) && (!maxPages && maxPages !== 0)) {
            findOptions.pageCount = (0, typeorm_1.MoreThanOrEqual)(minPages);
        }
        else if ((maxPages === 0 || maxPages) && (!minPages && minPages !== 0)) {
            findOptions.pageCount = (0, typeorm_1.LessThanOrEqual)(maxPages);
        }
        else if (maxPages && minPages) {
            findOptions.pageCount = (0, typeorm_1.Between)(minPages, maxPages);
        }
        return this.bookRepository.findBy(findOptions);
    }
    async getBook(id) {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) {
            throw new common_1.HttpException('Book not found!', 404);
        }
        return book;
    }
    async createBook(bookName, author, description, pageCount) {
        const newBook = this.bookRepository.create({ bookName, author, description, pageCount });
        return this.bookRepository.save(newBook);
    }
    async updateBook(id, bookName, author, description, pageCount) {
        const book = this.bookRepository.create({ id, bookName, author, description, pageCount });
        return this.bookRepository.save(book);
    }
    async deleteBook(id) {
        this.bookRepository.delete({ id });
    }
    async populateDb() {
        for (let i = 0; i < 100; i++) {
            const newBook = this.bookRepository.create({
                bookName: faker_1.faker.book.title(),
                author: faker_1.faker.book.author(),
                description: faker_1.faker.lorem.paragraphs().slice(0, 500),
                pageCount: faker_1.faker.number.int({ max: 750, min: 1 })
            });
            await this.bookRepository.save(newBook);
        }
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(book_entity_1.BookEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map