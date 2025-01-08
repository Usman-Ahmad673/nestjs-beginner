import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/home')
  @Render('home')
  home() {
    return { title: 'Welcome to My NestJS App', message: 'Hello, World!' };
  }
}
