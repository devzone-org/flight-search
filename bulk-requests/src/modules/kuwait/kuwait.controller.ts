import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KuwaitService } from './kuwait.service';
import { CreateKuwaitDto } from './dto/create-kuwait.dto';
import { UpdateKuwaitDto } from './dto/update-kuwait.dto';

@Controller('kuwait')
export class KuwaitController {
  constructor(private readonly kuwaitService: KuwaitService) {}

  @Post()
  create(@Body() createKuwaitDto: CreateKuwaitDto) {
    return this.kuwaitService.create(createKuwaitDto);
  }

  @Get()
  findAll() {
    return this.kuwaitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kuwaitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKuwaitDto: UpdateKuwaitDto) {
    return this.kuwaitService.update(+id, updateKuwaitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kuwaitService.remove(+id);
  }
}
