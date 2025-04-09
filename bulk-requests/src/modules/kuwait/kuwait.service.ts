import { Injectable } from '@nestjs/common';
import { CreateKuwaitDto } from './dto/create-kuwait.dto';
import { UpdateKuwaitDto } from './dto/update-kuwait.dto';

@Injectable()
export class KuwaitService {
  private data = [
    { id: 1, name: 'Kuwait A', from: 'Lahore', to: 'Doha', api: 'https://jsonplaceholder.typicode.com/todos/1' },
    { id: 2, name: 'Kuwait B', from: 'Sialkot', to: 'Dubai', api: 'https://jsonplaceholder.typicode.com/todos/2' },
    { id: 3, name: 'Kuwait C', from: 'Islambad', to: 'Riyadh', api: 'https://jsonplaceholder.typicode.com/todos/4' },
  ];
  create(createKuwaitDto: CreateKuwaitDto) {
    return 'This action adds a new kuwait';
  }

  findAll() {
    return `This action returns all kuwait`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kuwait`;
  }
  searchByFromTo(from: string, to: string) {
  console.log(from, to);
  
    return this.data.filter(item => item.from === from && item.to === to);
  }
  
  update(id: number, updateKuwaitDto: UpdateKuwaitDto) {
    return `This action updates a #${id} kuwait`;
  }

  remove(id: number) {
    return `This action removes a #${id} kuwait`;
  }
}
