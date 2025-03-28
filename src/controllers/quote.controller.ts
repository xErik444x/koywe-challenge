import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuoteFacade } from '../facades/quote.facade';
import { CreateQuoteDto, QuoteResponseDto } from '../dto/quote.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Quotes')
@Controller('quote')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QuoteController {
  constructor(private readonly quoteFacade: QuoteFacade) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a new quote' })
  @ApiResponse({ 
    status: 201, 
    description: 'Quote created successfully',
    type: QuoteResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createQuote(@Body() quoteRequest: CreateQuoteDto) {
    return await this.quoteFacade.createQuote(quoteRequest);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a quote by ID' })
  @ApiParam({ name: 'id', description: 'Quote ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Quote found',
    type: QuoteResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Quote not found' })
  async getQuoteById(@Param('id') id: string) {
    return await this.quoteFacade.getQuoteById(id);
  }
}