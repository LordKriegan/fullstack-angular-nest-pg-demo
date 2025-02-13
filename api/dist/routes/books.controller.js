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
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    async books() {
        return this.booksService.books();
    }
    async searchBooks(bookName, author, minPages, maxPages) {
        return this.booksService.searchBooks(bookName, author, minPages, maxPages);
    }
    async getBook(id) {
        return this.booksService.getBook(id);
    }
    async saveBook(bookName, author, pageCount) {
        return this.booksService.saveBook(bookName, author, pageCount);
    }
    async updateBook(bookName, author, pageCount) {
        return this.booksService.updateBook(bookName, author, pageCount);
    }
    async deleteBook(id) {
        return this.booksService.deleteBook(id);
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
    __param(0, (0, common_1.Body)('bookName')),
    __param(1, (0, common_1.Body)('author')),
    __param(2, (0, common_1.Body)('minPages')),
    __param(3, (0, common_1.Body)('maxPages')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "searchBooks", null);
__decorate([
    (0, common_1.Get)('getBook'),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBook", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('bookName')),
    __param(1, (0, common_1.Body)('author')),
    __param(2, (0, common_1.Body)('pageCount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "saveBook", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)('bookName')),
    __param(1, (0, common_1.Body)('author')),
    __param(2, (0, common_1.Body)('pageCount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "deleteBook", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map