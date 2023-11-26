import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '../auth.guard';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('api/notes')
@UseGuards(AuthGuard) 
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(
    @Body('title') title: string,
    @Body('content') content: string
  ) {

    if((title =='' || title==' ' || title == null) == true ||
    (content =='' || content==' ' || content == null) == true
     ) {
      throw new HttpException(
        "invalid input",
        HttpStatus.BAD_REQUEST,
      );
    } else{
      let notesInfo = {     
        title,
        content    
      };
     return await this.notesService.create(notesInfo);
    }    
  }

  @Get()     
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':noteId')
  async findOne(@Param('noteId') noteId: number) {
    let note = await this.notesService.findOne(noteId);
    if(note == null) {
        throw new HttpException(
          "Note does not exist",
          HttpStatus.BAD_REQUEST
        )
    }

    return note;
  }

  @Put(':noteId')
  async update(@Param('noteId') noteId: number, 
    @Body('title') title: string,
    @Body('content') content: string
  ) {

    if((title =='' || title==' ' || title == null) == true ||
    (content =='' || content==' ' || content == null) == true
     ){
      throw new HttpException(
        "invalid input",
        HttpStatus.BAD_REQUEST,
      );
    }else{

      let note = await this.notesService.findOne(noteId)
      if(note == null) {
          throw new HttpException(
            "Note does not exist",
            HttpStatus.BAD_REQUEST
          )
      }

      let notesInfo = {     
        title,
        content    
      };
      return this.notesService.update(+noteId, notesInfo);
    }
  }

  @Delete(':noteId')
  async remove(@Param('noteId') noteId: number) {
    let note = await this.notesService.findOne(noteId)
    if(note == null) {
        throw new HttpException(
          "Note does not exist",
          HttpStatus.BAD_REQUEST
        )
    }

    return {"message": (await this.notesService.remove(+noteId)).affected == 0 ? "Failed to delete note":"Note successfully deleted"};
  }
}
