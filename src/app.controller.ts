import { Controller, Get, UseGuards, Req, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthGuard } from '@nestjs/passport';
//import { AuthGuard } from './auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {     
    return this.appService.googleLogin(req)
  }

  @Delete()
  async logout(@Req() req) {
    if(req.headers?.authorization){
      globalThis.googleAccessToken = '';
      globalThis.userId = null;
      return { "message": "User logout" };
    }
    throw new HttpException(
      "No user logged in",
      HttpStatus.NOT_FOUND
    )
    
  }

}
