import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({
        length:200
    })
    text: string;

    @Column({
        length:100
    })
    title: string;

    @Column("text")
    imageUrl: string;

    @Column("time")
    createdDate: number;
}