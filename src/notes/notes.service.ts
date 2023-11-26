import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notes } from './notes.model';


@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {}

  async create(notesInfo){
    const n: Notes = new Notes();    
    n.title = notesInfo.title;
    n.content = notesInfo.content;
    n.user_id = globalThis.userId;
    n.created = new Date();
    n.updated = new Date();
    return await this.notesRepository.save(n);
  }

  async findAll() {
    const notes = await this.notesRepository.createQueryBuilder('notes')
    .where("user_id = :id", { id: globalThis.userId }).getMany();
    return notes; 
  }

  async findOne(id: number) {
    const notes = await this.notesRepository.createQueryBuilder('notes')
    .where("id = :id and user_id = :userId", { id, userId: globalThis.userId }).getOne();
    return notes; 
  }

  async update(id:number, note) {
    note.updated = new Date()
    return await this.notesRepository.save({ id, ...note });
  }

  async remove(id: number) {
    const note = await this.notesRepository.delete(id);
    return note;
  }
}
