import { Test, TestingModule } from '@nestjs/testing';
import { BlueService } from './blue.service';

describe('BlueService', () => {
  let service: BlueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlueService],
    }).compile();

    service = module.get<BlueService>(BlueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
