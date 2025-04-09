import { Test, TestingModule } from '@nestjs/testing';
import { DubaiController } from './dubai.controller';
import { DubaiService } from './dubai.service';

describe('DubaiController', () => {
  let controller: DubaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DubaiController],
      providers: [DubaiService],
    }).compile();

    controller = module.get<DubaiController>(DubaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
