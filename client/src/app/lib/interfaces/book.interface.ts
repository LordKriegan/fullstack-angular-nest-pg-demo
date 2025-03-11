import { IAuthor } from "./author.interface";
import { IChapter } from "./chapter.interface";

export interface IBook {
    id?: number;
    authors?: IAuthor[];
    chapters?: IChapter[];
    bookName?: string;
    pageCount?: number;
    description?: string;
}