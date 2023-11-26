import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {  
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string
  ) {
    const userInfo = {     
      first_name,
      last_name,
      email
    };
   return await this.usersService.create(userInfo);
  }
 
}
