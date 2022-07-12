import { Test, TestingModule } from '@nestjs/testing';
import { ServeController } from './serve.controller';
import { ServeService } from './serve.service';

describe('ServeController', () => {
  let serveController: ServeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServeController],
      providers: [ServeService],
    }).compile();

    serveController = app.get<ServeController>(ServeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serveController.getHello()).toBe('Hello World!');
    });
  });
});
