import { Test, TestingModule } from '@nestjs/testing';
import { PiaController } from './pia.controller';
import { PiaService } from './pia.service';

describe('PiaController', () => {
  let controller: PiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiaController],
      providers: [PiaService],
    }).compile();

    controller = module.get<PiaController>(PiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
