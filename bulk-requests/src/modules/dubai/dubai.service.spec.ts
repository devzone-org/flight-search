import { Test, TestingModule } from '@nestjs/testing';
import { DubaiService } from './dubai.service';

describe('DubaiService', () => {
  let service: DubaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DubaiService],
    }).compile();

    service = module.get<DubaiService>(DubaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
