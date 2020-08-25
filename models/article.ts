import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length:100
    })
    title: string;

    @Column({
        length:1000
    })
    text: string;

    @Column("text")
    imageUrl: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    time: string;
}