import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PiaService } from './pia.service';
import { CreatePiaDto } from './dto/create-pia.dto';
import { UpdatePiaDto } from './dto/update-pia.dto';

@Controller('pia')
export class PiaController {
  constructor(private readonly piaService: PiaService) {}

  @Post()
  create(@Body() createPiaDto: CreatePiaDto) {
    return this.piaService.create(createPiaDto);
  }

  @Get()
  findAll() {
    return this.piaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.piaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePiaDto: UpdatePiaDto) {
    return this.piaService.update(+id, updatePiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.piaService.remove(+id);
  }
}
