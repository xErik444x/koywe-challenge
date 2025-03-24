import { IsNotEmpty, IsNumber, IsString, Min, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty({
    description: 'Amount to convert',
    example: 1000000
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'Source currency code',
    example: 'ARS'
  })
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty({
    description: 'Target currency code',
    example: 'ETH'
  })
  @IsString()
  @IsNotEmpty()
  to: string;
}

export class QuoteResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the quote',
    example: '9f8d14f8-c471-448d-8935-f7d5e30f6454'
  })
  id: string;

  @ApiProperty({
    description: 'Source currency code',
    example: 'ARS'
  })
  from: string;

  @ApiProperty({
    description: 'Target currency code',
    example: 'ETH'
  })
  to: string;

  @ApiProperty({
    description: 'Amount to convert',
    example: 1000000
  })
  amount: number;

  @ApiProperty({
    description: 'Exchange rate',
    example: 1
  })
  rate: number;

  @ApiProperty({
    description: 'Converted amount',
    example: 2.3
  })
  convertedAmount: number;

  @ApiProperty({
    description: 'Quote creation timestamp',
    example: '2025-02-03T12:00:00Z'
  })
  timestamp: string;

  @ApiProperty({
    description: 'Quote expiration timestamp',
    example: '2025-02-03T12:05:00Z'
  })
  expiresAt: string;
}