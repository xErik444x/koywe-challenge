import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/dal/prisma/prisma.service';
import { ExchangeRateProvider } from '../src/providers/exchange-rate/exchange-rate.provider';

describe('QuoteController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(PrismaService)
    .useValue({
      quote: {
        create: jest.fn().mockResolvedValue({
          id: '123e4567-e89b-12d3-a456-426614174000',
          from: 'USD',
          to: 'BTC',
          amount: 100,
          rate: 0.000034,
          convertedAmount: 0.0034,
          timestamp: new Date(),
          expiresAt: new Date(Date.now() + 300000)
        }),
        findFirst: jest.fn().mockResolvedValue({
          id: '123e4567-e89b-12d3-a456-426614174000',
          from: 'USD',
          to: 'BTC',
          amount: 100,
          rate: 0.000034,
          convertedAmount: 0.0034,
          timestamp: new Date(),
          expiresAt: new Date(Date.now() + 300000)
        })
      },
      $connect: jest.fn(),
      $disconnect: jest.fn()
    })
    .overrideProvider(ExchangeRateProvider)
    .useValue({
      getPrice: jest.fn().mockResolvedValue(0.000034)
    })
    .compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    
    await app.init();
  });

  it('/quote (POST)', () => {
    return request(app.getHttpServer())
      .post('/quote')
      .send({
        from: 'USD',
        to: 'BTC',
        amount: 100
      })
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('rate');
        expect(res.body).toHaveProperty('convertedAmount');
        expect(res.body.from).toBe('USD');
        expect(res.body.to).toBe('BTC');
        expect(res.body.amount).toBe(100);
      });
  });

  it('/quote/:id (GET)', () => {
    return request(app.getHttpServer())
     .get('/quote/123e4567-e89b-12d3-a456-426614174000')
     .expect(200)
     .expect(res => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('rate');
        expect(res.body).toHaveProperty('convertedAmount');
        expect(res.body.from).toBe('USD');
        expect(res.body.to).toBe('BTC');
        expect(res.body.amount).toBe(100);
      });
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });
});