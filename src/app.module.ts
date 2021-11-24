import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/Report.entity';
import { User } from './users/User.entity';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite', //bc we're using a sqlite db
      database: 'db.sqlite', //name of the db
      entities: [Report, User],
      synchronize: true, //recreates a new instance of the db every launch (not good for prod)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
