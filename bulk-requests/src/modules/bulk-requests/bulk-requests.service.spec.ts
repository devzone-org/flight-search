import { Test, TestingModule } from '@nestjs/testing';
import { BulkRequestsService } from './bulk-requests.service';

describe('BulkRequestsService', () => {
  let service: BulkRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BulkRequestsService],
    }).compile();

    service = module.get<BulkRequestsService>(BulkRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
