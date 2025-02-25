import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChapterEntity as Chapter } from "./chapter.entity";

@Entity()
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '50' })
    bookName: string;

    @Column({ type: 'varchar', length: '50' })
    author: string;

    @Column({ type: 'int' })
    pageCount: number;

    @Column({ type: 'varchar', length: '500' })
    description: string;

    @OneToMany(() => Chapter, chapter => chapter.book, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    chapters: Chapter[];
}   