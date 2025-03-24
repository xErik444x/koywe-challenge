import { Injectable } from '@nestjs/common';
import { ExchangeRateBll } from '../bll/exchange-rate.bll';
import { QuoteRequest, QuoteResponse } from '../interfaces/controllers/quote.interface';

@Injectable()
export class QuoteFacade {
  constructor(
    private readonly conversionService: ExchangeRateBll,
  ) {}

  async createQuote(request: QuoteRequest): Promise<QuoteResponse> {
    const {amount, from, to} = request;
    return await this.conversionService.getRate(amount, from, to);
  }

  async getQuoteById(id: string): Promise<QuoteResponse> {
    return await this.conversionService.getRateById(id);
  }
}