export declare class UpdateBookDTO {
    bookName: string;
    author: string;
    pageCount: number;
    description: string;
}
export declare class LocateBookDTO {
    id: number;
}
export declare class SearchBookDTO {
    bookName: string;
    author: string;
    minPages: number;
    maxPages: number;
    description: string;
}
