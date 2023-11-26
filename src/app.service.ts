import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}
 
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }
    const userInfo = {     
      first_name : req.user.firstName,
      last_name : req.user.lastName,
      email  : req.user.email,
      accessToken: req.user.accessToken
    };
    globalThis.googleAccessToken = req.user.accessToken;
    await this.usersService.create(userInfo);
    
    return {
      message: 'User Info from Google',
      user: req.user
    }
  }
  
}