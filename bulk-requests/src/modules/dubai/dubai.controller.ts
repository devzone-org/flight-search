import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DubaiService } from './dubai.service';
import { CreateDubaiDto } from './dto/create-dubai.dto';
import { UpdateDubaiDto } from './dto/update-dubai.dto';

@Controller('dubai')
export class DubaiController {
  constructor(private readonly dubaiService: DubaiService) {}

  @Post()
  create(@Body() createDubaiDto: CreateDubaiDto) {
    return this.dubaiService.create(createDubaiDto);
  }

  @Get()
  findAll() {
    return this.dubaiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dubaiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDubaiDto: UpdateDubaiDto) {
    return this.dubaiService.update(+id, updateDubaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dubaiService.remove(+id);
  }
}
