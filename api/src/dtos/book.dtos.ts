import { IsNotEmpty, IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateBookDTO {

    @IsNotEmpty()
    @IsString()
    bookName: string;

    @IsNotEmpty()
    @IsString()
    author: string;

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