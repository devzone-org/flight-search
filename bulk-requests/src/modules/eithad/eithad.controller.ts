import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EithadService } from './eithad.service';
import { CreateEithadDto } from './dto/create-eithad.dto';
import { UpdateEithadDto } from './dto/update-eithad.dto';

@Controller('eithad')
export class EithadController {
  constructor(private readonly eithadService: EithadService) {}

  @Post()
  create(@Body() createEithadDto: CreateEithadDto) {
    return this.eithadService.create(createEithadDto);
  }

  @Get()
  findAll() {
    return this.eithadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eithadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEithadDto: UpdateEithadDto) {
    return this.eithadService.update(+id, updateEithadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eithadService.remove(+id);
  }
}
