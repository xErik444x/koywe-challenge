import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateProvider } from './providers/exchange-rate/exchange-rate.provider';
import { ConversionService } from './bll/exchange-rate.bll';
import { QuoteController } from './controllers/quote.controller';
import { QuoteFacade } from './facades/quote.facade';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
  ],
  controllers: [QuoteController],
  providers: [ExchangeRateProvider, ConversionService, QuoteFacade],
})
export class AppModule {}
