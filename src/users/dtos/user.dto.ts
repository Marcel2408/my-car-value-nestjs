import { Expose } from 'class-transformer';

export class UserDto {
  @Expose() //this makes sure this field is sent to frontend
  id: number;

  @Expose()
  email: string;
}
