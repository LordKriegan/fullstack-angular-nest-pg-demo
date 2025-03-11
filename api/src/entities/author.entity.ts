import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity as Book } from "./book.entity";

@Entity()
export class AuthorEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '50'})
    author: string

    @ManyToOne(_ => Book, book => book.authors, {
        onDelete: "CASCADE"
    }) 
    book: Book
    
}