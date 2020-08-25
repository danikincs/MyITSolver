import {Entity, Column, PrimaryColumn} from "typeorm"

@Entity()
export class Token {

    @PrimaryColumn()
    token: string;


    @Column()
    usage: number;


    @Column()
    maxUsage: number;

    @Column()
    platformType: string;
}