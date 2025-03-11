import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity as Author } from '../../entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author) private authorsRepository: Repository<Author>,
    ) { }

    async createAuthor(bookId: number, author: string): Promise<Author> {
        const newAuthor = this.authorsRepository.create({ 
            author, 
            book: { 
                id: bookId 
            } 
        })
        return this.authorsRepository.save(newAuthor)
    }

    async updateAuthor(id: number, author: string): Promise<Author> {
        const updatedAuthor = this.authorsRepository.create({
            id, author
        });
        return this.authorsRepository.save(updatedAuthor);
    }

    async deleteChapter(id: number): Promise<void> {
        this.authorsRepository.delete({ id });
    }
}
