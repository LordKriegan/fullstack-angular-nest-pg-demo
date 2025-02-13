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
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("./books.service");
const book_dtos_1 = require("../dtos/book.dtos");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    async books() {
        return this.booksService.books();
    }
    async searchBooks({ bookName, author, description, minPages, maxPages }) {
        return this.booksService.searchBooks(bookName, author, description, minPages, maxPages);
    }
    async getBook({ id }) {
        return this.booksService.getBook(id);
    }
    async saveBook({ bookName, author, description, pageCount }) {
        return this.booksService.createBook(bookName, author, description, pageCount);
    }
    async updateBook({ id }, { bookName, author, description, pageCount }) {
        return this.booksService.updateBook(id, bookName, author, description, pageCount);
    }
    async deleteBook({ id }) {
        return this.booksService.deleteBook(id);
    }
    async populateDb() {
        return this.booksService.populateDb();
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "books", null);
__decorate([
    (0, common_1.Get)('searchBooks'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dtos_1.SearchBookDTO]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "searchBooks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dtos_1.LocateBookDTO]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBook", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dtos_1.UpdateBookDTO]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "saveBook", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dtos_1.LocateBookDTO,
        book_dtos_1.UpdateBookDTO]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dtos_1.LocateBookDTO]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "deleteBook", null);
__decorate([
    (0, common_1.Post)('/populate-database'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "populateDb", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map