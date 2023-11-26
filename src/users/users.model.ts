import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;
 
}


@Entity()
export class UserLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number; 

  @Column()
  token: string; 
}