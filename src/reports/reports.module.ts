import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './Report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])], //this creates the Repository behind the scenes
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
