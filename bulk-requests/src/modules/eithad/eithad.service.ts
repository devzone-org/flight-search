import { Injectable } from '@nestjs/common';
import { CreateEithadDto } from './dto/create-eithad.dto';
import { UpdateEithadDto } from './dto/update-eithad.dto';

@Injectable()
export class EithadService {
  private data = [
    { id: 1, name: 'Eithad A', from: 'Lahore', to: 'Doha', api: 'https://jsonplaceholder.typicode.com/todos/1' },
    { id: 2, name: 'Eithad B', from: 'Lahore', to: 'Dubai', api: 'https://jsonplaceholder.typicode.com/todos/2' },
    { id: 3, name: 'Eithad C', from: 'Islambad', to: 'Riyadh', api: 'https://jsonplaceholder.typicode.com/todos/4' },
  ];
  create(createEithadDto: CreateEithadDto) {
    return 'This action adds a new eithad';
  }

  findAll() {
    return `This action returns all eithad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eithad`;
  }
  searchByFromTo(from: string, to: string) {
    return this.data.filter(item => item.from === from && item.to === to);
  }
  

  update(id: number, updateEithadDto: UpdateEithadDto) {
    return `This action updates a #${id} eithad`;
  }

  remove(id: number) {
    return `This action removes a #${id} eithad`;
  }
}
