import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logs/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UsersModule } from './panel/users/users.module';

config();

@Module({
  imports: [LoggerModule, MongooseModule.forRoot(process.env.MONGO), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
