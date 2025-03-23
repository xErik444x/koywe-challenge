import { HttpException, Injectable } from '@nestjs/common';
import { ExchangeRateProvider } from '../providers/exchange-rate/exchange-rate.provider';
import { QuoteResponse } from 'src/interfaces/controllers/quote.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConversionService {
  constructor(private readonly exchangeRateProvider: ExchangeRateProvider) {}

  async getRate(amount: number, from: string, to: string): Promise<QuoteResponse> {
      const rate = await this.exchangeRateProvider.getPrice(from, to);
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 5 * 60000);

      return {
        id: uuidv4(),
        from,
        to,
        amount,
        rate: rate,
        convertedAmount: amount * rate,
        timestamp: now.toISOString(),
        expiresAt: expiresAt.toISOString()
    };
   
    //!TODO add rate to db
  }
}