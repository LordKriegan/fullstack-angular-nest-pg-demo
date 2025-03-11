import { Body, Controller, Delete, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { LocateBookDTO } from '../../dtos/book.dtos';
import { LocateAuthorDTO, UpdateAuthorDTO } from '../../dtos/authors.dtos';
import { AuthorEntity as Author } from '../../entities/author.entity';

@Controller('authors')
export class AuthorsController {
    constructor(
        private authorsService: AuthorsService
    ){}

    @Post(":id")
    async createAuthor(
        @Param(new ValidationPipe({ transform: true })) { id }: LocateBookDTO,
        @Body() { author }: UpdateAuthorDTO
    ): Promise<Author> {
        return this.authorsService.createAuthor(id, author);
    }

    @Put(":id")
    async updateAuthor(
        @Param(new ValidationPipe({ transform: true })) { id }: LocateAuthorDTO,
        @Body() { author }: UpdateAuthorDTO
    ): Promise<Author> {
        return this.authorsService.updateAuthor(id, author);
    }

    @Delete(":id")
    async deleteAuthor(
        @Param(new ValidationPipe({ transform: true })) { id }: LocateAuthorDTO,
    ): Promise<void> {
        return this.authorsService.deleteChapter(id)
    }
}
