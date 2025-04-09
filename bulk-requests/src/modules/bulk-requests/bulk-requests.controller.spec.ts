import { Test, TestingModule } from '@nestjs/testing';
import { BulkRequestsController } from './bulk-requests.controller';
import { BulkRequestsService } from './bulk-requests.service';

describe('BulkRequestsController', () => {
  let controller: BulkRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BulkRequestsController],
      providers: [BulkRequestsService],
    }).compile();

    controller = module.get<BulkRequestsController>(BulkRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
