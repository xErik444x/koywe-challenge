import { Module } from '@nestjs/common';
import { PrismaService } from './dal/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateProvider } from './providers/exchange-rate/exchange-rate.provider';
import { ExchangeRateBll } from './bll/exchange-rate.bll';
import { QuoteController } from './controllers/quote.controller';
import { QuoteFacade } from './facades/quote.facade';
import { QuoteRepository } from './dal/repositories/quote.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [QuoteController],
  providers: [
    PrismaService,
    ExchangeRateProvider,
    ExchangeRateBll,
    QuoteFacade,
    QuoteRepository,
  ],
})
export class AppModule {}
