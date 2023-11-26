import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';

import { Users } from './users/users.model';
import { Notes } from './notes/notes.model';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'notesdb',
      entities: [Users, Notes],
      synchronize: true,
    }), 
    UsersModule,
    NotesModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    GoogleStrategy, 
    AuthGuard,  
  ],
})
export class AppModule {}

