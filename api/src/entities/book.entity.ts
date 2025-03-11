import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChapterEntity as Chapter } from "./chapter.entity";
import { AuthorEntity as Author } from "./author.entity"

@Entity()
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '50' })
    bookName: string;

    @Column({ type: 'int' })
    pageCount: number;

    @Column({ type: 'varchar', length: '500' })
    description: string;

    @OneToMany(() => Chapter, chapter => chapter.book, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    chapters: Chapter[];

    @OneToMany(() => Author, author => author.book, {
        onDelete: 'CASCADE',
        cascade: true
    })
    authors: Author[];
}   