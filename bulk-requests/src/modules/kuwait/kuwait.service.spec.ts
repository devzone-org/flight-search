import { Test, TestingModule } from '@nestjs/testing';
import { KuwaitService } from './kuwait.service';

describe('KuwaitService', () => {
  let service: KuwaitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KuwaitService],
    }).compile();

    service = module.get<KuwaitService>(KuwaitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
