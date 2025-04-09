import { Test, TestingModule } from '@nestjs/testing';
import { EithadController } from './eithad.controller';
import { EithadService } from './eithad.service';

describe('EithadController', () => {
  let controller: EithadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EithadController],
      providers: [EithadService],
    }).compile();

    controller = module.get<EithadController>(EithadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
