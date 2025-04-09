import { Injectable } from '@nestjs/common';
import { CreateBlueDto } from './dto/create-blue.dto';
import { UpdateBlueDto } from './dto/update-blue.dto';

@Injectable()
export class BlueService {
  private data = [
    { id: 1, name: 'Blue A', from: 'Lahore', to: 'Doha', api: 'https://jsonplaceholder.typicode.com/todos/1' },
    { id: 2, name: 'Blue B', from: 'Sialkot', to: 'Dubai', api: 'https://jsonplaceholder.typicode.com/todos/2' },
    { id: 3, name: 'Blue C', from: 'Islambad', to: 'Riyadh', api: 'https://jsonplaceholder.typicode.com/todos/4' },
  ];
  create(createBlueDto: CreateBlueDto) {
    return 'This action adds a new blue';
  }

  findAll() {
    return `This action returns all blue`;
  }
  searchByFromTo(from: string, to: string) {
    return this.data.filter(item => item.from === from && item.to === to);
  }
  
  findOne(id: number) {
    return `This action returns a #${id} blue`;
  }

  update(id: number, updateBlueDto: UpdateBlueDto) {
    return `This action updates a #${id} blue`;
  }

  remove(id: number) {
    return `This action removes a #${id} blue`;
  }
}
