// import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude() //this isn't necessary using the custom interceptor approach. It is done in the user.dto, like this we can have different kind of serialization in different routes of the same entity
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('User created with id: ', this.id); //the this here is the instance of User created in the service using create() from TypeOrm, without that this doesn't run
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User updated with id: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('User deleted with id: ', this.id);
  }
}
