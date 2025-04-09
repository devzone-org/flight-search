import { Test, TestingModule } from '@nestjs/testing';
import { KuwaitController } from './kuwait.controller';
import { KuwaitService } from './kuwait.service';

describe('KuwaitController', () => {
  let controller: KuwaitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KuwaitController],
      providers: [KuwaitService],
    }).compile();

    controller = module.get<KuwaitController>(KuwaitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
