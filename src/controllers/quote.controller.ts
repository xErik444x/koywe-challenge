import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param } from '@nestjs/common';
import { QuoteFacade } from '../facades/quote.facade';
import { CreateQuoteDto } from 'src/dto/quote.dto';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteFacade: QuoteFacade) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createQuote(@Body() quoteRequest: CreateQuoteDto) {
    return await this.quoteFacade.createQuote(quoteRequest);
  }

  @Get("/:id")
  async getQuoteById(@Param('id') id: string) {
    return await this.quoteFacade.getQuoteById(id);
  } 
}