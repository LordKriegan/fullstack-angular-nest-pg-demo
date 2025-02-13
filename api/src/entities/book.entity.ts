import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}   