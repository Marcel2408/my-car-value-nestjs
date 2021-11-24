import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface SerializableClass {
  new (...args: any[]): {}; //this means any class constructor (will complain if no class is provided)
}

// this is a decorator fn we can use in the Controller to shorten the code
export function Serialize(dto: SerializableClass) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  //implements NestInterceptor interface to make sure intercept is called (is optional help)
  constructor(private dto: SerializableClass) {} //make it reusable with any class

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run code before the request is handled
    // console.log('runnning before the handler', context);

    return handler.handle().pipe(
      //from this return it goes to the controller and Nest automatically sends as JSON
      map((data: any) => {
        // run before the response is sent out
        //converts data into the dto instance
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, //everything not market as Expose in the UserDto will be excluded from the final response object
        });
      }),
    );
  }
}
