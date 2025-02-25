import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity as Book } from "./book.entity";

@Entity()
export class ChapterEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '50' })
    chapterName: string;

    @Column({ type: 'int', })
    pageCount: number;

    @Column({ type: 'varchar', length: '500' })
    description: string;

    @ManyToOne(_ => Book, book => book.chapters, {
        onDelete: 'CASCADE'
    })
    book: Book;
}