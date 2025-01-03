import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }

  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: Number) {
    return this.userService.findUserById(id);
  }

  @Post('')
  createUsers(@Body(ValidationPipe) user: CreateUserDTO) {
    return this.userService.createUsers(user);
  }

  @Patch(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: Number,
    @Body(ValidationPipe) user: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, user);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: Number) {
    return this.userService.deleteUserById(id);
  }
}
