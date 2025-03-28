import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RateInterface } from 'src/interfaces/providers/exchange-rate.interface';
import { AxiosError } from 'axios';

@Injectable()
export class ExchangeRateProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getPrice(from: string, to: string): Promise<number> {
    try {
      const { data, status } = await this.httpService.axiosRef.get<RateInterface>(
        `${this.configService.get('EXCHANGE_API_URL')}/price/rate?from=${from}&to=${to}`
      );

      if (status !== 200) {
        throw new HttpException(
          'Exchange rate service unavailable',
          HttpStatus.BAD_GATEWAY
        );
      }

      if (!data || !data[from]) {
        throw new HttpException(
          `Invalid currency code: ${from}`,
          HttpStatus.BAD_REQUEST
        );
      }

      return Number(data[from].price);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(
          `Exchange rate service error: ${error.message}`,
          HttpStatus.BAD_GATEWAY
        );
      }
      throw error;
    }
  }
}