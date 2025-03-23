import { Injectable } from '@nestjs/common';
import { ConversionService } from '../bll/exchange-rate.bll';
import {QuoteRequest, QuoteResponse} from '../interfaces/controllers/quote.interface'
@Injectable()
export class QuoteFacade {
  constructor(private readonly conversionService: ConversionService) {}

  async createQuote(request: QuoteRequest): Promise<QuoteResponse> {
    const rate = await this.conversionService.getRate(request.amount, request.from, request.to);
    return rate;
  }
}