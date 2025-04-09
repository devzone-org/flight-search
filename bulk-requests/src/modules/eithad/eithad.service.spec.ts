import { Test, TestingModule } from '@nestjs/testing';
import { EithadService } from './eithad.service';

describe('EithadService', () => {
  let service: EithadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EithadService],
    }).compile();

    service = module.get<EithadService>(EithadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
