import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LocateAuthorDTO {
    @Transform(( { value } ) => {
        if (typeof parseInt(value.slice(0,1)) != 'number') {
            throw new Error('not a number')
        }
        return parseInt(value)
    })
    @IsNumber()
    id: number;
}

export class UpdateAuthorDTO {
    @IsString()
    @IsNotEmpty()
    author: string;
}