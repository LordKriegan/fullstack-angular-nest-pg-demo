"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
let BooksService = class BooksService {
    books() {
        return '// works!';
    }
    searchBooks(bookName, author, minPages, maxPages) {
        console.log(bookName, author, minPages, maxPages);
        return '/searchBooks/ works!';
    }
    getBook(id) {
        console.log(id);
        return '/getBook/ works!';
    }
    saveBook(bookName, author, pageCount) {
        console.log(bookName, author, pageCount);
        return '// works!';
    }
    updateBook(bookName, author, pageCount) {
        console.log(bookName, author, pageCount);
        return '// works!';
    }
    deleteBook(id) {
        console.log(id);
        return '// works!';
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)()
], BooksService);
//# sourceMappingURL=books.service.js.map