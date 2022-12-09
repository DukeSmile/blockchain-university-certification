import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Terms {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar', unique: true, default: true })
    public title: string;

    @Column({ type: 'varchar' })
    public subjects: string;
}