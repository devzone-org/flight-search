import { Test, TestingModule } from '@nestjs/testing';
import { PiaService } from './pia.service';

describe('PiaService', () => {
  let service: PiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiaService],
    }).compile();

    service = module.get<PiaService>(PiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
