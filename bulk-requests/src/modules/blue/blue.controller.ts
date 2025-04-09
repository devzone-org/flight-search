import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlueService } from './blue.service';
import { CreateBlueDto } from './dto/create-blue.dto';
import { UpdateBlueDto } from './dto/update-blue.dto';

@Controller('blue')
export class BlueController {
  constructor(private readonly blueService: BlueService) {}

  @Post()
  create(@Body() createBlueDto: CreateBlueDto) {
    return this.blueService.create(createBlueDto);
  }

  @Get()
  findAll() {
    return this.blueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlueDto: UpdateBlueDto) {
    return this.blueService.update(+id, updateBlueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blueService.remove(+id);
  }
}
