import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Notes } from './notes.model';

@Module({
  imports: [TypeOrmModule.forFeature([Notes])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
