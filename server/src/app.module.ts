import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TasksService } from './services/task.service';
import { AppGateway } from './app.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, TasksService, AppGateway],
})
export class AppModule {}
