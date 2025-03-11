import { IsNotEmpty, IsString, IsNumber, IsPositive, IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { UpdateChapterDTO } from './chapters.dtos';

export class UpdateBookDTO {

    @IsOptional()
    @IsArray()
    @IsString()
    @IsNotEmpty()
    authors: string[];

    @IsOptional()
    @IsArray()
    @IsString()
    @IsNotEmpty()
    chapters: UpdateChapterDTO[];

    @IsNotEmpty()
    @IsString()
    bookName: string;

    @IsNumber()
    @IsPositive()
    pageCount: number;

    @IsNotEmpty()
    @IsString()
    description: string;

}

export class LocateBookDTO {

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    id: number;
    
}

export class SearchBookDTO {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    bookName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    author: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    chapter: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    minPages: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    maxPages: number;

    @IsOptional()
    @IsString()
    description: string;

}