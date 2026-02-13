import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // 'users' is the table name
export class Users {

@PrimaryGeneratedColumn() // Auto-increment ID
id: number;


@Column() // Simple column
name: string;


@Column()
email: string;

}