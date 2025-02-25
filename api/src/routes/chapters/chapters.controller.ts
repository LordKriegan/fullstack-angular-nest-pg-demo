import { Body, Controller, Delete, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { LocateChapterDTO, UpdateChapterDTO } from 'src/dtos/chapters.dtos';
import { ChapterEntity as Chapter } from 'src/entities/chapter.entity';
import { ChaptersService } from './chapters.service';

@Controller('chapters')
export class ChaptersController {

    constructor(
        private chaptersService: ChaptersService
    ) {}

    @Post() 
    async createChapter(
        @Body() { chapterName, pageCount, description, bookId }: UpdateChapterDTO
    ): Promise<Chapter> {
        return this.chaptersService.createChapter(chapterName, pageCount, description, bookId)
    }

    @Put(':id')
    async updateChapter(
        @Param(new ValidationPipe({ transform: true })) { id }: LocateChapterDTO,
        @Body() { chapterName, pageCount, description }: UpdateChapterDTO
    ): Promise<Chapter> {
        return this.chaptersService.updateChapter(id, chapterName, pageCount, description)
    }

    @Delete(':id') 
    async deleteChapter(
        @Param(new ValidationPipe({ transform: true })) { id }: LocateChapterDTO
    ): Promise<void> {
        this.chaptersService.deleteChapter(id);
    }
}
