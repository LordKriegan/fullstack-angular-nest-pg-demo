export interface IBookSearchOptions {
    [name: string]: string | number | undefined;
    author?: string;
    bookName?: string;
    minPages?: number;
    maxPages?: number;
    description?: string;
}