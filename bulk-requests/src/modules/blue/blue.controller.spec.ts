import { Test, TestingModule } from '@nestjs/testing';
import { BlueController } from './blue.controller';
import { BlueService } from './blue.service';

describe('BlueController', () => {
  let controller: BlueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlueController],
      providers: [BlueService],
    }).compile();

    controller = module.get<BlueController>(BlueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
