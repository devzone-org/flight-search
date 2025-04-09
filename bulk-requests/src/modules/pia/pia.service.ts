import { Injectable } from '@nestjs/common';
import { CreatePiaDto } from './dto/create-pia.dto';
import { UpdatePiaDto } from './dto/update-pia.dto';

@Injectable()
export class PiaService {
  private data = [
    { id: 1, name: 'PIA A', from: 'Islambad', to: 'Doha', api: 'https://jsonplaceholder.typicode.com/todos/1' },
    { id: 2, name: 'PIA B', from: 'Sialkot', to: 'Dubai', api: 'https://jsonplaceholder.typicode.com/todos/2' },
    { id: 3, name: 'PIA C', from: 'Islambad', to: 'Riyadh', api: 'https://jsonplaceholder.typicode.com/todos/4' },
  ];
  create(createPiaDto: CreatePiaDto) {
    return 'This action adds a new pia';
  }

  findAll() {
    return `This action returns all pia`;
  }
  searchByFromTo(from: string, to: string) {
    return this.data.filter(item => item.from === from && item.to === to);
  }
  
  findOne(id: number) {
    return `This action returns a #${id} pia`;
  }

  update(id: number, updatePiaDto: UpdatePiaDto) {
    return `This action updates a #${id} pia`;
  }

  remove(id: number) {
    return `This action removes a #${id} pia`;
  }
}
