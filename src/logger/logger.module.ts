import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
// sda
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
