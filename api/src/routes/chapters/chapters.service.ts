import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChapterEntity as Chapter } from 'src/entities/chapter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChaptersService {

    constructor(
        @InjectRepository(Chapter) private readonly chaptersRepository: Repository<Chapter>
    ) { }

    async createChapter(chapterName: string, pageCount: number, description: string, bookId: number): Promise<Chapter> {
        const chapter = this.chaptersRepository.create({ 
            chapterName, 
            pageCount, 
            description, 
            book: { 
                id: bookId 
            } 
        })
        return this.chaptersRepository.save(chapter)
    }

    async updateChapter(id: number, chapterName: string, pageCount: number, description: string): Promise<Chapter> {
        const chapter = this.chaptersRepository.create({ id, chapterName, pageCount, description });
        return this.chaptersRepository.save(chapter)
    }

    async deleteChapter(id: number): Promise<void> {
       this.chaptersRepository.delete({ id }) 
    }
}
