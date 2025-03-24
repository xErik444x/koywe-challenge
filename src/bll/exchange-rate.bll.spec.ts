import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateBll } from './exchange-rate.bll';
import { ExchangeRateProvider } from '../providers/exchange-rate/exchange-rate.provider';
import { ConfigService } from '@nestjs/config';
import { QuoteRepository } from '../dal/repositories/quote.repository';

describe('ExchangeRateBll', () => {
  let service: ExchangeRateBll;
  let exchangeRateProvider: ExchangeRateProvider;
  let configService: ConfigService;
  let quoteRepository: QuoteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeRateBll,
        {
          provide: ExchangeRateProvider,
          useValue: {
            getPrice: jest.fn()
          }
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn()
          }
        },
        {
          provide: QuoteRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<ExchangeRateBll>(ExchangeRateBll);
    exchangeRateProvider = module.get<ExchangeRateProvider>(ExchangeRateProvider);
    configService = module.get<ConfigService>(ConfigService);
    quoteRepository = module.get<QuoteRepository>(QuoteRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRate', () => {
    it('should return a quote response', async () => {
      const mockRate = 1.5;
      const mockQuote = {
        id: '1',
        from: 'USD',
        to: 'BTC',
        amount: 100,
        rate: mockRate,
        convertedAmount: 150,
        timestamp: new Date(),
        expiresAt: new Date()
      };

      jest.spyOn(exchangeRateProvider, 'getPrice').mockResolvedValue(mockRate);
      jest.spyOn(configService, 'get').mockReturnValue(5);
      jest.spyOn(quoteRepository, 'create').mockResolvedValue(mockQuote);

      const result = await service.getRate(100, 'USD', 'BTC');

      expect(result).toBeDefined();
      expect(result.rate).toBe(mockRate);
      expect(result.convertedAmount).toBe(150);
    });
  });

  describe('getRateById', () => {
    it('should return a quote response', async () => {
      const mockQuote = {
        id: '1',
        from: 'USD',
        to: 'BTC',
        amount: 100,
        rate: 1.5,
        convertedAmount: 150,
        timestamp: new Date(),
        expiresAt: new Date()
      };
      jest.spyOn(quoteRepository, 'findById').mockResolvedValue(mockQuote);
      const result = await service.getRateById('1');
      expect(result).toBeDefined();
      expect(result.id).toBe('1');
    });
  });
});