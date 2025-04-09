import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Sse } from '@nestjs/common';
import { BulkRequestsService } from './bulk-requests.service';
import { CreateBulkRequestDto } from './dto/create-bulk-request.dto';
import { UpdateBulkRequestDto } from './dto/update-bulk-request.dto';
import { Observable } from 'rxjs';

@Controller('bulk-requests')
export class BulkRequestsController {
  constructor(private readonly bulkRequestsService: BulkRequestsService) {}

  @Post()
  create(@Body() createBulkRequestDto: CreateBulkRequestDto) {
    return this.bulkRequestsService.create(createBulkRequestDto);
  }
  @Sse('search')
  search(@Query('from') from: string, @Query('to') to: string): Observable<MessageEvent> {
    return this.bulkRequestsService.matchingServicesSSE(from, to);
  }
  //used for receiving response as a whole in one time
  // @Get('search')
  // findAll(@Query('from') from: string, @Query('to') to: string) {

  //   return this.bulkRequestsService.matchingServices(from, to);
  // }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bulkRequestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBulkRequestDto: UpdateBulkRequestDto) {
    return this.bulkRequestsService.update(+id, updateBulkRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bulkRequestsService.remove(+id);
  }
}
