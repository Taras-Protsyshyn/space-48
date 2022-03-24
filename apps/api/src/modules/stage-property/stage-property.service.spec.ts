import { Test, TestingModule } from '@nestjs/testing';
import { StagePropertyService } from './stage-property.service';

describe('StagePropertyService', () => {
  let service: StagePropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StagePropertyService],
    }).compile();

    service = module.get<StagePropertyService>(StagePropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
