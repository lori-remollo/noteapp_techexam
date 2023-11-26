import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users, UserLogs } from './users.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(userInfo){      
    const u: Users = new Users();    
    u.firstName = userInfo.first_name;
    u.lastName = userInfo.last_name;
    u.email = userInfo.email;

    const isRegistered = await this.userRepository.createQueryBuilder("users")
    .where("email = :email", { email: userInfo.email }).getOne(); 
    
    if(!isRegistered){
      const result = await this.userRepository.save(u);
      globalThis.userId = result.id;
      return result;
    }else{
      globalThis.userId = isRegistered.id;
      return "Email already exists!"
    }

  }

  async createlog(userInfo){
    const ul: UserLogs = new UserLogs();    

    const user = await this.userRepository.createQueryBuilder("users")
    .where("email = :email", { email: userInfo.email }).getOne(); 

    ul.user_id = user.id;
    ul.token = userInfo.token;
    return await this.userRepository.save(ul);
  }

}
