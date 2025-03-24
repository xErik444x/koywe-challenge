import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Quote } from '@prisma/client';

@Injectable()
export class QuoteRepository {
  constructor(private prisma: PrismaService) {}

  async create(quote: {
    from: string;
    to: string;
    amount: number;
    rate: number;
    convertedAmount: number;
    expiresAt: Date;
  }): Promise<Quote> {
    return this.prisma.quote.create({
      data: quote
    });
  }

  async findById(id: string): Promise<Quote | null> {
    const quote = await this.prisma.quote.findFirst({
      where: {
        AND: [
          { id },
          { expiresAt: { gt: new Date() } }
        ]
      }
    });

    return quote;
  }
}