import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class LocateChapterDTO {
    
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    id: number;
    
}

export class UpdateChapterDTO {

    @IsNotEmpty()
    @IsString()
    chapterName: string;

    @IsNumber()
    @IsPositive()
    pageCount: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    bookId: number;

}