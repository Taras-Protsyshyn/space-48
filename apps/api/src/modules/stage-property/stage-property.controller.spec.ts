import { Test, TestingModule } from '@nestjs/testing';
import { StagePropertyController } from './stage-property.controller';

describe('StagePropertyController', () => {
  let controller: StagePropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StagePropertyController],
    }).compile();

    controller = module.get<StagePropertyController>(StagePropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
