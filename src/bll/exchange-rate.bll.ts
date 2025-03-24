import { HttpException, Injectable } from '@nestjs/common';
import { ExchangeRateProvider } from '../providers/exchange-rate/exchange-rate.provider';
import { QuoteResponse } from 'src/interfaces/controllers/quote.interface';
import { ConfigService } from '@nestjs/config';
import { QuoteRepository } from '../dal/repositories/quote.repository';

@Injectable()
export class ExchangeRateBll {
  constructor(
    private readonly exchangeRateProvider: ExchangeRateProvider,
    private readonly configService: ConfigService,
    private readonly quoteRepository: QuoteRepository,
  ) {}

  async getRate(amount: number, from: string, to: string): Promise<QuoteResponse> {
    const rate = await this.exchangeRateProvider.getPrice(from, to);
    const now = new Date();
    
    const quoteExpiredTime = this.configService.get<number>('QUOTE_EXPIRED', 5);
    const expiresAt = new Date(now.getTime() + quoteExpiredTime * 60000);

    const savedQuote = await this.quoteRepository.create({
      from,
      to,
      amount,
      rate,
      convertedAmount: amount * rate,
      expiresAt
    });

    return {
      id: savedQuote.id,
      from: savedQuote.from,
      to: savedQuote.to,
      amount: savedQuote.amount,
      rate: savedQuote.rate,
      convertedAmount: savedQuote.convertedAmount,
      timestamp: savedQuote.timestamp.toISOString(),
      expiresAt: savedQuote.expiresAt.toISOString()
    };
  }

  async getRateById(id: string): Promise<QuoteResponse> {
    const quote = await this.quoteRepository.findById(id);
    
    if (!quote) {
      throw new HttpException('Quote not found or has expired', 404);
    }

    return {
      id: quote.id,
      from: quote.from,
      to: quote.to,
      amount: quote.amount,
      rate: quote.rate,
      convertedAmount: quote.convertedAmount,
      timestamp: quote.timestamp.toISOString(),
      expiresAt: quote.expiresAt.toISOString()
    };
  }
}