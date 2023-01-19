import { Test } from '@nestjs/testing';
import { BeveragesController } from './beverages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beverage } from './beverage.entity';
import { BeveragesServiceImpl } from './beverages.service.impl';
import { BeveragesModule } from './beverages.module';
import { DataSource } from 'typeorm';

describe('BeveragesController', () => {
  let beveragesController: BeveragesController;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'ssafy',
          password: 'ssafy',
          database: 'ssafy_project_test',
          entities: [Beverage],
          synchronize: false,
          timezone: '+09:00',
          charset: 'utf8mb4',
          logging: true,
        }),
        BeveragesModule,
        TypeOrmModule.forFeature([Beverage]),
      ],
      controllers: [BeveragesController],
      providers: [BeveragesServiceImpl],
    }).compile();

    beveragesController = moduleRef.get<BeveragesController>(BeveragesController);
    dataSource = moduleRef.get<DataSource>(DataSource);
    dataSource.createEntityManager;
  });

  afterAll(async () => {
    dataSource.destroy();
  });

  afterEach(async () => {
    const entities = dataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.clear();
    }
  });

  it('should be defined', () => {
    expect(beveragesController).toBeDefined();
  });

  it('search query 테스트', async () => {
    const b1: Beverage = {
      beverage_name: 'DEF',
      beverage_id: undefined,
      beverage_image_url: undefined,
    };
    const b2: Beverage = {
      beverage_name: 'ABC',
      beverage_id: undefined,
      beverage_image_url: undefined,
    };
    const b3: Beverage = {
      beverage_name: 'GHI',
      beverage_id: undefined,
      beverage_image_url: undefined,
    };
    await beveragesController.post(b1);
    await beveragesController.post(b2);
    await beveragesController.post(b3);
    const result1 = await beveragesController.getAll(1, 1, undefined, 'H');
    // 사이즈는 한개여야 하며
    expect(result1.items.length).toEqual(1);
    // H가 나와야 한다.
    expect(result1.items[0].beverage_name).toEqual('GHI');
  });
});
