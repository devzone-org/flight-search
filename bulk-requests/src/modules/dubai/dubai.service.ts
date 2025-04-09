import { Injectable } from '@nestjs/common';
import { CreateDubaiDto } from './dto/create-dubai.dto';
import { UpdateDubaiDto } from './dto/update-dubai.dto';

@Injectable()
export class DubaiService {
  private data = [
    { id: 1, name: 'Dubai A', from: 'Lahore', to: 'Doha', api: 'https://jsonplaceholder.typicode.com/todos/1' },
    { id: 2, name: 'Dubai B', from: 'Sialkot', to: 'Dubai', api: 'https://jsonplaceholder.typicode.com/todos/2' },
    { id: 3, name: 'Dubai C', from: 'Islambad', to: 'Riyadh', api: 'https://jsonplaceholder.typicode.com/todos/4' },
  ];
  create(createDubaiDto: CreateDubaiDto) {
    return 'This action adds a new dubai';
  }

  findAll() {
    return `This action returns all dubai`;
  }

  searchByFromTo(from: string, to: string) {
    return this.data.filter(item => item.from === from && item.to === to);
  }
  
  findOne(id: number) {
    return `This action returns a #${id} dubai`;
  }

  update(id: number, updateDubaiDto: UpdateDubaiDto) {
    return `This action updates a #${id} dubai`;
  }

  remove(id: number) {
    return `This action removes a #${id} dubai`;
  }
}
